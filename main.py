"""Server"""

import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
import uvicorn
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitSDK, LangGraphAgent
from recipe.agent import graph


app = FastAPI()
sdk = CopilotKitSDK(
    agents=[
        LangGraphAgent(
            name="gastro_agent",
            description="Recommend recipes and plan meals.",
            agent=graph,
        )
    ],
)

add_fastapi_endpoint(app, sdk, "/copilotkit")



def main():
    """Run the uvicorn server."""
    PORT = int(os.getenv("PORT", "8000"))
    APP_ENV = os.getenv("APP_ENV")
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=(APP_ENV == "development"))