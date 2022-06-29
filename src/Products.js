import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';



export default class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            content: [],
            page: 0,
            rowsPerPage: 5,
            search: "",
        };
    }
    async componentDidMount() {
        const url = "https://reqres.in/api/products";
        const res = await fetch(url);
        const data = await res.json();
        this.setState({ content: data.data, isLoading: false });
    }

    render() {

        const handleChangePage = (event, newPage) => {
            this.setState({ page: newPage })

        };

        if (this.state.isLoading) {
            return <div>Still loading, wait for it</div>;
        }


        return (
            <div>
                <TextField
                    className='test'
                    type="number"
                    value={this.state.search}
                    onChange={e => this.setState({ search: e.target.value })}
                />

                <TableContainer className='main' component={Paper} sx={{ maxWidth: 800 }}>


                    <Table
                        sx={{ minWidth: 400 }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell value="id" align="center">ID</TableCell>
                                <TableCell align="center">NAME</TableCell>
                                <TableCell align="center">YEAR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.content
                                .filter((row) =>
                                    !this.state.search.length ||
                                    row.id.toString() === this.state.search.toString()
                                )

                                .slice(this.state.page * 5, this.state.page * 5 + 5)
                                .map((row) => (
                                    <TableRow className='table-rows' key={row.name} bgcolor={row.color} >
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.year}</TableCell>
                                    </TableRow>
                                ))}

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[this.state.rowsPerPage]}
                                    count={this.state.content.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onPageChange={handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

