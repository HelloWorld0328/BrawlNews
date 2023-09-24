import fastapi

app=fastapi.FastAPI()
@app.get("/")
def getget():
    return {"name":"kim"}