import { Candidate } from './Candidate';
import { Voter } from './Voter';
export interface Vote {
    Id: string;
    Casted: boolean;
    Candidate: Candidate;
    Voter: Voter;
}
