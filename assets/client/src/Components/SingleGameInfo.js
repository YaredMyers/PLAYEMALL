import React, { Component } from 'react';
import axios from "axios";
import Loading2 from './Loading2';
import "./SingleGameInfo.css";

export default class SingleGameInfo extends Component {
    constructor() {
        super();
        this.state = { gameInfo: null };
    }

    getGameInfo = () => {
        console.log(this.props.match.params);
        const { params } = this.props.match;
        console.log(params);
        axios.get(`http://localhost:5000/api/dbroutes/gameinfo/${params.id}`)
            .then(responseFromApi => {
                console.log(responseFromApi.data);
                this.setState({
                    gameInfo: responseFromApi.data
                });
            });
    };

    componentDidMount() {
        this.getGameInfo();
    }

    render() {



        if (this.state.gameInfo === null) {
            return (
                <div>
                    <Loading2/>
                </div>
            )
        } else {

            let platforms = null;
            if (this.state.gameInfo[0].platforms !== undefined) {
                platforms = this.state.gameInfo[0].platforms.map((platform) => {
                    return <span>{platform.name}, </span>
                })
            } else { platforms = 'not available' }

            let genres = null;
            if (this.state.gameInfo[0].genres !== undefined) {
                genres = this.state.gameInfo[0].genres.map((genre) => {
                    return <span>{genre.name}, </span>
                })
            } else { genres = 'not available' }


            let publishers = null;
            if (this.state.gameInfo[0].publishers !== undefined) {
                publishers = this.state.gameInfo[0].publishers.map((publisher) => {
                    return <span>{publisher.name}, </span>
                })
            } else { publishers = 'not available' }

            let firstReleaseDate = null;
            if (this.state.gameInfo[0].first_release_date) {
                firstReleaseDate = new Date(this.state.gameInfo[0].first_release_date).toLocaleDateString('en-De');
            } else { firstReleaseDate = 'not available' }

            let cover = null;
            if (this.state.gameInfo[0].cover !== undefined) {
                cover = `//images.igdb.com/igdb/image/upload/t_cover_big/${this.state.gameInfo[0].cover.cloudinary_id}.jpg`;
            } else { cover = `https://shop.purgatoryresort.com/bundles/spotliowebappfront/purgatoryresort/images/photo_not_available.jpg` }

            let screenshot = null;
            if (this.state.gameInfo[0].screenshots !== undefined ) {
                screenshot = `//images.igdb.com/igdb/image/upload/t_screenshot_med/${this.state.gameInfo[0].screenshots[0].cloudinary_id}.jpg`
            } else { screenshot = `https://shop.purgatoryresort.com/bundles/spotliowebappfront/purgatoryresort/images/photo_not_available.jpg` }

            let video = null;
            if (this.state.gameInfo[0].videos !== undefined) {
                video = `https://www.youtube.com/embed/${this.state.gameInfo[0].videos[0].video_id}`;
            } else { video = 'https://www.youtube.com/embed/tgbNymZ7vqY' }


            return (
                <div className="singleGameCont">
                    <img className="coverGameInfo" alt="cover" src={cover} />
                    <h1 className="titleGameInfo">{this.state.gameInfo[0].name}</h1>
                    <p className="genreGameInfo"><b>Genre:</b> {genres}</p>
                    <p className="releaseGameInfo"><b>Release date:</b> {firstReleaseDate}</p>
                    <p className="platGameInfo"><b>Platforms:</b> {platforms}</p>
                    <p className="rateGameInfo"><b>rating:</b> {this.state.gameInfo[0].total_rating}</p>
                    <p className="publiGameInfo"><b>Publishers:</b> {publishers}</p>
                    <p className="pUrlInfo"><a className="urlGameInfo" href={this.state.gameInfo[0].url}><b>Info:</b>{this.state.gameInfo[0].name}@IGDB</a></p>
                    <p><b>Summary</b></p>
                    <p className="summaryGameInfo"> {this.state.gameInfo[0].summary}</p>
                    
                    <p className="screenGameInfo"><b>Screenshots</b></p>
                    <img className="screen2GameInfo" alt="img" src={screenshot} />
                    
                    <h3 className="videoTitleInfo"><b>Videos</b></h3>
                    <iframe className="videoGameInfo" title="view" width="420" height="315" src={video} />
                </div>
            )

        }

    }
}

