import React, { Component, Suspense } from 'react';

import styles from '../css/blog.module.css';
import '../css/slick-slider.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import corona from '../img/coronavirus.jpg'

import '../assets/base.css'

import BlogPost from './blogPost';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/postActions';

import Pagniation from './pagination';
import { Redirect } from 'react-router-dom';
import Map from './map.js'
import Loader from './loader';
import Dashboard from './dashboard.js';

function sort (a, b) {

    const postA = parseInt(a.relevance);
    const postB = parseInt(a.relevance);
  
    let comparison = 0;
    if (postA > postB) {
      comparison = 1;
    } else if (postA < postB) {
      comparison = -1;
    }
    return comparison;
  }

class Blog extends Component {

    componentDidMount() {

        const url = this.props.location.pathname;
        const page = url.slice(url.lastIndexOf('/')+1);

        // see if a country is referenced 
        let allCountries = true;
        const countriesMap = {
            '/canada/' : 'ca',
            '/united-states/' : 'us',
            '/germany/' : 'de',
            '/italy/' : 'it',
            '/united-kingdom/' : 'gb',
            '/france/' : 'fr',
            '/netherlands/' : 'nl',
            '/austria/' : 'at',
            '/switzerland/' : 'ch'
        }
        const countries = ['/canada/','/united-states/','/germany/','/italy/','/united-kingdom/','/france/','/netherlands/','/austria/','/switzerland/']
        for (let i=0; i < countries.length; i++) {
            if (url.includes(countries[i])) { 
                this.props.fetchAllPosts(page, countriesMap[countries[i]])
                allCountries = false;
                break; 
            }
        }

        if (allCountries) {
            this.props.fetchAllPosts(page) 
        }
    }

    render(){
        const props = this.props;
        const jsonPosts = props.state.posts.posts;
        const length = props.state.posts.length;
        let redirect = false;
        const url = this.props.location.pathname;
        let posts = [];
        let pagination = ''

        if (length > 0) {

            let page = url.slice(url.lastIndexOf('/')+1);
            if (page > (Math.floor(length / 12) + 1)) { /* throw 404 */ 
                redirect = true; 
            }

            posts = jsonPosts.map((post, index) =>  {
                return (<BlogPost source={post.source} relevance={post.relevance} sentiment={post.sentiment} index={index} title={post.title} headerImg={post.headerImg} id={post.id} 
                region={post.region} date={post.date} url={post.url} 
                /> )
                }
            );

            pagination = <Pagniation total={length}/>

        } if (redirect) {
            return (
                <Redirect to="/404" />
            )
        } else {
                return (
                <div>
                    {/* <section style={{width:'80%',margin:'auto',marginTop:150,marginBottom:100}}>
                        <Card>
                            <CardContent>
                                <img src={corona} />
                                <h2>Real time news from around the globe</h2>
                                <p>Select a Country and monitor updates to keep track of loved ones, and get new developments from overseas</p>
                            </CardContent>
                        </Card>
                    </section> */}

                    <div style={{marginTop: 160, padding: '0 30px'}}class="section-header">
                        <h3 style={{fontWeight:300,padding:0}}class="section-title">Global Corona Virus Statistics</h3>
                        <span class="section-divider"></span>
                        <p style={{padding:0}}class="section-description">
                            Updated daily from Johns Hopkins Coronavirus Resource Center<br/>
                        </p>
                    </div>

                    <Map />
                    <Dashboard />

                <section className={styles.sContent}>

                    <div style={{marginBottom:60,padding: '0 30px'}} class="section-header">
                        <h3 style={{marginTop:0,fontWeight:300,padding:0}}class="section-title">News Powered by AI</h3>
                        <span class="section-divider"></span>
                        <p style={{padding:0}}class="section-description">
                            Quality news relating to policy, developments, and expert recommendations<br/>
                        </p>
                    </div>
                    
                    <div className={[styles.row,styles.entriesWrap,styles.wide].join(" ")}>
                        <div className={styles.entries}>
                            {posts}
                        </div> 
                    </div>

                    {pagination}

                </section> 
            </div>
            )
        } 
    }
}

const mapStateToProps = state => ({
    state: state.BlogReducer,
})

export default connect(mapStateToProps, { fetchAllPosts })(Blog);