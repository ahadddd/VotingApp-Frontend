import { City } from "./City";
import { Vote } from "./Vote";

export interface Candidate {
    Id: string;
    Name: string;
    Position: string;
    Votes: Vote[];
    City: City;
}
