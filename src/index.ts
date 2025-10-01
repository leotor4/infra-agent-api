import 'dotenv/config'
import express from "express";
import cors from "cors";
import { concludeJob, createJob, getNextJob } from "./services/job-service";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', getNextJob);
app.post('/', createJob);
app.put('/:jobId/finish-job', concludeJob);

console.log(process.env.DATABASE_URL)

app.listen(3000, () => console.log("Running server on port 3000"));