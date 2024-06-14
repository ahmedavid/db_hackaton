from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')

templates = Jinja2Templates(directory="templates")

# Main page
@app.get("/")
async def read_root(request: Request, message='Welcome Deutsche Bank support Center!'):
    return templates.TemplateResponse('index.html', {"request": request, 'message': message})

@app.post("/solve")
async def solve(request: Request, question: str = Form(...)):
    return {"your_question": question}
