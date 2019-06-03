import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genre: [],
        sortColumn: { path: 'title', order: 'asc' }
    }
    componentDidMount() {
        const genre = [{ name: "All Genres", _id: "321654" }, ...getGenres()]
        this.setState({ movies: getMovies(), genre });
    };

    handleDelete = movie => {
        let movies = this.state.movies.filter(m => m._id !== movie._id)

        this.setState({ movies })
    };
    handleLiked = movie => {
        let movies = [...this.state.movies];
        let index = movies.indexOf(movie);
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page })
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })

    };

    handleSort = sortColumn => {

        this.setState({ sortColumn })
    };

    getPageData = () => {
        const { currentPage, pageSize, selectedGenre, movies: allMovies, sortColumn } = this.state;
        const filtered = selectedGenre && selectedGenre.name !== "All Genres" ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    }

    render() {
        let { length: count } = this.state.movies;
        const { currentPage, pageSize, genre, sortColumn } = this.state;
        if (count === 0) return "There are no movies in the database.";

        const { totalCount, data: movies } = this.getPageData()

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup items={genre} textProperty="name" selectedItem={this.state.selectedGenre} valuePropety="_id" onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies in the database</p>
                    <MoviesTable movies={movies} onLike={this.handleLiked} onDelete={this.handleDelete} onSort={this.handleSort} sortColumn={sortColumn} />
                    <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                </div>

            </div>

        );
    }
}

export default Movies;