# 🍳 Swathi's Personal Culinary Assistant

Swathi’s Personal Culinary Assistant is an intelligent kitchen helper designed to make cooking simpler and smarter. It interprets natural prompts, extracts ingredients, and suggests personalized recipes. Whether you’re experimenting in the kitchen or just trying to figure out what to do with the leftovers in your fridge, this app has your back.

---

## 🧠 What It Does

This assistant blends AI with culinary creativity:
- Understands user prompts like: *“What can I cook with eggs, spinach, and mushrooms?”*
- Extracts ingredients automatically from natural language
- Suggests relevant recipes and cooking ideas
- Optionally uses the Spoonacular API for enhanced recommendations
- Works offline using a built-in knowledge base if APIs aren’t available

---

## 🔧 How to Run It

### Backend Setup

```bash
cd agent
python3 -m venv venv
# For Windows:
venv\Scripts\activate
# For Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
