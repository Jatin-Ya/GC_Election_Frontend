import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResultTable = (props) => {
      
      const notaVotes = props.postResults.nota;
      const abstainVotes = props.postResults.abstain;
      const candidateVotes = [
        ...props.postResults.contestants,
        {
            name : "NOTA",
            votes : notaVotes
        },
        {
            name : "Abstain From Voting",
            votes : abstainVotes
        }
    ].sort((a,b) => b.votes-a.votes);


        return (
        <div>
            <TableContainer component={Paper} style = {{margin : "20px"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell>Candidate Name</TableCell>
                  <TableCell align="right">Votes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidateVotes
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.votes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        );
}

export default ResultTable;