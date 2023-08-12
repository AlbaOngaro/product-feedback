import { Surreal, ExperimentalSurrealHTTP } from "surrealdb.js";

export const surreal =
  process.env.NEXT_RUNTIME === "edge"
    ? new ExperimentalSurrealHTTP("http://127.0.0.1:8000/rpc")
    : new Surreal("http://127.0.0.1:8000/rpc");
