from fastapi import APIRouter
import openai

query_router = APIRouter()


def get_table_schema(db_connection, table_name):
    cursor = db_connection.cursor()

    # Query to get column details
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()

    # Format the output
    formatted_schema = f"{table_name} (" + ", ".join(
        f"{col[1]} {col[2]}" for col in columns
    ) + ")"

    return formatted_schema

@query_router.get("/raw")
def get_raw():
    from src.main import conn

    cursor = conn.cursor()

    cursor.execute('''
        SELECT * FROM data
    ''')

    rows = cursor.fetchall()

    columns = [description[0] for description in cursor.description]

    results = [dict(zip(columns, row)) for row in rows][:1000]
    return {"data": results}

@query_router.get("/process")
def get_raw(prompt: str = None):
    from src.main import conn

    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "system", "content": '''
                        You are an expert SQL query generator. Your task is to convert natural language data manipulation requests into SQL queries. Use the following rules:
                        1. Use proper SQL syntax.
                        2. Output only the query, with no explanations or comments.
                        3. Include table and column names as specified in the input.
                        4. Do not make assumptions about missing details. If the input lacks clarity, generate a query that best matches the request without guessing.
                        5. Be deterministic—your output must be consistent and free from randomness.
                        
                        Example 1:
                        Input: "Fetch all rows from the products table."
                        Table: "products (name TEXT, price REAL, quantity INTEGER, sales INTEGER)"
                        Output: SELECT * FROM products;

                        Example 2:
                        Input: "Get the total sales from the sales table grouped by region."
                        Table: "sales (name TEXT, region TEXT, sales INTEGER)"
                        Output: SELECT region, SUM(sales) AS total_sales FROM sales GROUP BY region;    
                    '''
                   },
                   {
                        "role": "user",
                        "content": f'''
                            Input: "{prompt}"
                            Table: "{get_table_schema(conn, 'data')}"
                        '''
                   }],
        temperature=0.00000001  # Reduce randomness for stricter output
    )

    from src.main import conn

    cursor = conn.cursor()

    cursor.execute(response.choices[0].message.content)

    rows = cursor.fetchall()

    columns = [description[0] for description in cursor.description]

    results = [dict(zip(columns, row)) for row in rows]

    return {
        "query": response.choices[0].message.content,
        "data": results
    }

@query_router.get("/")
def test():
    return {"message": "ok"}