"""
This is the main entry point for the AI.
It defines the workflow graph and the entry point for the agent.
"""

import re
import requests
from typing import cast
from langchain_core.messages import ToolMessage, AIMessage
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
# Agent State
from recipe.state import AgentState, Recipe

# Nodes
def query_openai_node(state: AgentState):
    """Node for querying OpenAI."""
    # Get the last message from the messages list
    if not state.get("messages") or len(state.get("messages", [])) == 0:
        error_message = "No messages found in state"
        return {"messages": [AIMessage(error_message)],
            "recipes": [],
            "type": "error",
            "result": error_message,
            "search_progress": [],
            "ingredients": [],
            "planning_progress": [
            {                
                "planned_recipes": [],
                "done": True
                }
            ]
        }

    last_message = state.get("messages", [])
    query = last_message[-1].content.lower() if last_message else ""

    if not query:
        error_message = "Query is missing. Please provide a valid query."
        return {"messages": [AIMessage(error_message)],
            "recipes": [],
            "type": "error",
            "result": error_message,
            "search_progress": [],
            "ingredients": [],
            "planning_progress": [
            {                
                "planned_recipes": [],
                "done": True
                }
            ]
        }
        return state



    model = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        openai_api_key=os.getenv("OPENAI_API_KEY"), 
        base_url=os.getenv("OPENAI_BASE_URL"),
    )

    # try:
    response = model.invoke(query)
    # print("response:",response)
    # print("response type",type(response))
    try:
        ai_message_content = response.content
    
        ai_response = {"messages": [AIMessage(content=ai_message_content)],
        "recipes": [],
        "type": "chat",
        "result": ai_message_content,
        "search_progress": [],
        "ingredients": [],
        "planning_progress": [
        {                
            "planned_recipes": [],
            "done": True
            }
        ]
        }
        return ai_response
    except Exception as e:
        return {"messages": [AIMessage(error_message)],
            "recipes": [],
            "type": "error",
            "result": error_message,
            "search_progress": [],
            "ingredients": [],
            "planning_progress": [
            {                
                "planned_recipes": [],
                "done": True
                }
            ]
        }


def extract_ingredients_node(state: AgentState):
    """Node for extracting ingredients from text."""
    # Get the last message from the messages list
    # if not state.get("messages", []) or len(state.get("messages", [])) == 0:
    #     return state
    # last_message = state.get("messages", [])
    # text = last_message[-1].content.lower() if last_message else ""
    # common_words = {'how', 'do', 'i', 'cook', 'a', 'dish', 'with', 'and', 'is', 'the', 'can', 'you'}
    # words = re.findall(r'\b\w+\b', text)
    # ingredients = [word for word in words if word.lower() not in common_words]

    # state["recipes"] = []  # Initialize empty recipes list
    # state["search_progress"] = []  # Initialize empty search progress
    # state["search_progress"].append({
    #     "query": text,
    #     "results": [],
    #     "done": False
    # })
    # state["ingredients"] = ingredients
    # return state
    messages = state.get("messages", [])
    if not messages:
        return state  # No messages to process

    last_message_content = messages[-1].content if messages else ""
    query = f"Extract ingredients from the following text: '{last_message_content}'. Only give ingredients, don't give other things. If no ingredients are found just return None"

    # Initialize the OpenAI model
    model = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        max_tokens=50,
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL"),
    )

    try:
        response = model.invoke(query)
        ai_message_content = response.content
        if(ai_message_content == "None"):
            state["ingredients"] = []
            # print("Ingredients not found")
        else:
        # Parse the response for ingredients
            ingredients = ai_message_content.split(", ")  # Assuming the response lists ingredients
            ingredients = [ingredient.strip() for ingredient in ingredients if ingredient]

            # Update state
            state["ingredients"] = ingredients

        state["search_progress"] = [{
            "query": last_message_content,
            "results": [],
            "done": False
        }]
        if not ingredients:
            state["response"] = "No ingredients were found. Please provide more details."
        return state

    except Exception as e:
        # Handle API failure
        state["response"] = f"An error occurred while extracting ingredients: {str(e)}"
        return state

def is_recipe_query_node(state: AgentState):
    """Node for identifying if a query is recipe-related."""
    if not state.messages or len(state.messages) == 0:
        return state

    last_message = state.messages[-1]
    query = last_message.get("content", "").lower()
    
    keywords = {'recipe', 'cook', 'ingredient', 'dish', 'food', 'meal'}
    is_recipe = any(keyword in query for keyword in keywords)
    
    if is_recipe:
        state.search_progress = []  # Initialize search progress for recipe queries
        state.search_progress.append({
            "query": query,
            "results": [],
            "done": False
        })
    
    return state
import requests

def get_recipe_node(state: AgentState):
    """Node for fetching recipes using extracted ingredients."""
    if not state.get("search_progress") or len(state["search_progress"]) == 0:
        return {
            "messages": [AIMessage(content="No search progress found")],
            "recipes": [],
            "type": "error",
            "result": "No search progress found",
            "search_progress": [],
            "ingredients": [],
            "planning_progress": [
                {"planned_recipes": [], "done": True}
            ],
        }

    # Get current search progress and ingredients
    current_search = state["search_progress"][-1]
    ingredients = state.get("ingredients", [])
    spoonacular_api_key = os.getenv("SPOONACULAR_API_KEY")  # Add your Spoonacular API key here
    # Construct the URL for finding recipes
    url = (
        f"https://api.spoonacular.com/recipes/findByIngredients?"
        f"ingredients={','.join(ingredients)}&number=4&apiKey={spoonacular_api_key}"
    )
    if len(ingredients) == 0:
        last_message = state.get("messages", [])
        query = last_message[-1].content.lower() if last_message else ""

        model = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        max_tokens=50,
        openai_api_key=os.getenv("OPENAI_API_KEY"), 
        base_url=os.getenv("OPENAI_BASE_URL"),
        )

        # try:
        response = model.invoke(query)
        # print("response:",response)
        # print("response type",type(response))
        try:
            ai_message_content = response.content
        
            ai_response = {"messages": [AIMessage(content=ai_message_content)],
            "recipes": [],
            "type": "chat",
            "result": ai_message_content,
            "search_progress": [],
            "ingredients": [],
            "planning_progress": [
            {                
                "planned_recipes": [],
                "done": True
                }
            ]
            }
            return ai_response
        except Exception as e:
            return {"messages": [AIMessage(error_message)],
                "recipes": [],
                "type": "error",
                "result": error_message,
                "search_progress": [],
                "ingredients": [],
                "planning_progress": [
                {                
                    "planned_recipes": [],
                    "done": True
                    }
                ]
            }

    try:
        # Fetch recipes using the ingredients
        response = requests.get(url)
        response.raise_for_status()
        recipes_data = response.json()

        recipes = []
        base_url = "https://api.spoonacular.com/recipes"

        for recipe_data in recipes_data:
            recipe_id = recipe_data["id"]
            # Fetch detailed recipe information
            recipe_info_url = f"{base_url}/{recipe_id}/information?apiKey={spoonacular_api_key}"

            recipe_info_response = requests.get(recipe_info_url)
            recipe_info_response.raise_for_status()
            recipe_details = recipe_info_response.json()

            # Create a Recipe object with details
            recipe = {
                "id": str(recipe_details["id"]),
                "title": recipe_details["title"],
                "image": recipe_details.get("image", ""),
                "ingredients": [
                    ingredient["original"]
                    for ingredient in recipe_details.get("extendedIngredients", [])
                ],
                "instructions": recipe_details.get("instructions", "No instructions available"),
                "source_url": recipe_details.get("sourceUrl"),
                "rating": recipe_details.get("spoonacularScore"),  # Optional rating field
            }
            recipes.append(recipe)

        # Update the state
        state["recipes"] = recipes
        current_search["results"] = recipes
        current_search["done"] = True
        response = {
            "messages": [AIMessage(content="Found recipes with instructions.")],
            "recipes": recipes,
            "type": "recipe",
            "result": "Found recipes with instructions.",
            "search_progress": state["search_progress"],
            "ingredients": state["ingredients"],
            "planning_progress": [
                {"planned_recipes": recipes, "done": True}
            ],
        }
        return response

    except requests.exceptions.RequestException as e:
        error_message = f"Error fetching recipes: {e}"
        return {
            "messages": [AIMessage(content=error_message)],
            "recipes": [],
            "type": "error",
            "result": error_message,
            "search_progress": [],
            "ingredients": [],
            "planning_progress": [
                {"planned_recipes": [], "done": True}
            ],
        }

    except Exception as e:
        error_message = f"Unexpected error: {e}"
        return {
            "messages": [AIMessage(content=error_message)],
            "recipes": [],
            "type": "error",
            "result": error_message,
            "search_progress": [],
            "ingredients": [],
            "planning_progress": [
                {"planned_recipes": [], "done": True}
            ],
        }


def is_recipe_query_node(state: AgentState):
    """Node for identifying if a query is recipe-related."""
    messages= state.get("messages", [])
    query = messages[0].content.lower() if messages else ""
    keywords = {'recipe', 'cook', 'ingredient', 'dish', 'food', 'meal'}
    state["is_recipe_query"] = any(keyword in query for keyword in keywords)
    return state


# Routing logic
def route(state: AgentState):
    """Route the state based on the query type and progress."""
    if state.get("is_recipe_query", False):
        if "ingredients" not in state:
            return "extract_ingredients_node"
        if "response" not in state:
            return "get_recipe_node"
    else:
        if "response" not in state:
            return "query_openai_node"

    return END


# Build the graph
graph_builder = StateGraph(AgentState)

# Add nodes
graph_builder.add_node("query_openai_node", query_openai_node)
graph_builder.add_node("extract_ingredients_node", extract_ingredients_node)
graph_builder.add_node("get_recipe_node", get_recipe_node)
graph_builder.add_node("is_recipe_query_node", is_recipe_query_node)

# Define edges
graph_builder.add_edge(START, "is_recipe_query_node")
graph_builder.add_conditional_edges(
    "is_recipe_query_node", route, ["extract_ingredients_node", "get_recipe_node", "query_openai_node", END]
)
graph_builder.add_edge("extract_ingredients_node", "get_recipe_node")
graph_builder.add_edge("get_recipe_node", END)
graph_builder.add_edge("query_openai_node", END)

# Compile the graph
graph = graph_builder.compile(
    checkpointer=MemorySaver(),
    interrupt_after=["get_recipe_node", "query_openai_node"],
)
