from typing import List, Optional, TypedDict
from langgraph.graph import MessagesState

class Ingredient(TypedDict):
    """An ingredient."""
    name: str
    quantity: Optional[str]
    unit: Optional[str]

class Recipe(TypedDict):
    """A recipe."""
    id: str
    title: str
    image: str
    ingredients: List[Ingredient]
    instructions: List[str]
    source_url: Optional[str]
    rating: Optional[float]

class SearchProgress(TypedDict):
    """The progress of a recipe search."""
    query: str
    results: List[Recipe]
    done: bool

class PlanningProgress(TypedDict):
    """The progress of meal planning."""
    planned_recipes: List[Recipe]
    done: bool

class AgentState(MessagesState):
    """The state of the agent."""
    type: str
    result: str
    ingredients: List[Ingredient]
    selected_recipe_id: Optional[str]
    recipes: List[Recipe]
    search_progress: List[SearchProgress]
    planning_progress: List[PlanningProgress]
