import React, { Component } from 'react';
import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 
import {scaleLinear} from "d3-scale";
import '../css/style.css';

/**
 * Make sense of the numerical values
 */
const relevanceMap = scaleLinear()
.domain([0, 10, 50, 90])
.range(['General', 'Good Quality', 'Very Detailed', 'Critical Information', 'Exceptionally Written'])

const SentimentMap = scaleLinear()
.domain([-1,-.5, -.1, .1, .5, 1])
.range(['Very Negative', 'Very Negative', 'Negative', 'Neutral', 'Postive', 'Very Postive', 'Very Postive'])

class BlogPost extends Component {

    render() {
        const props = this.props;
        const date = new Date(props.date);

        let title = props.title
        if ( title.length > 80 ) { /* truncate the length for readability */
            title = title.slice(0, 80) + '...'
        } 

        const escaped_title = props.title.replace(/\./g,'&#46;').replace(/\//g,'&#47;')

        const countryMap = {
            ca : 'canada',
            us : 'united-states',
            de : 'germany',
            it : 'italy',
            gb : 'united-kingdom',
            fr : 'france',
            nl : 'netherlands',
            at : 'austria',
            ch : 'switzerland'
        } 

        if (!props.url) {
            return null
        } else {
            return (
                <Router forceRefresh="true">
                    <article itemscope itemtype ="http://schema.org/Blog" data-wow-duration="1s" data-wow-delay="1s" className={`${styles.colBlock} fadeInUp wow`}>  
                        <meta itemprop="position" content={props.index} />
                        <meta itemprop="keywords" content={'coronavirus,coronanewscanada,coronavirus tips,when will coronavirus end'} />
                        <div className={`${styles.itemEntry}`}>
                            <div className={styles.itemEntryThumb}>
                                <NavLink to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`} className={styles.itemEntryThumbLink}>
                                    <img itemprop="thumbnailUrl" src={props.headerImg} alt={title}/>
                                </NavLink>
                            </div> 
                            <div className={styles.itemEntryText}>
                                <div className={styles.itemEntryCat}>
                                    <NavLink itemprop="contributor" to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`}>{props.source}</NavLink>
                                </div>
                                <h1 itemprop="headline" style={{marginBottom: 150}} className={styles.itemEntryTitle}><NavLink to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`}>{title}</NavLink></h1>
                                <div className={styles.itemEntryDate}>
                                    <NavLink itemprop="datePublished" to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`} role="menuitem">{date.toDateString()}</NavLink>
                                </div>
                                <div style={{position: 'absolute', bottom: '7rem', left: '0px' ,width: '100%'}}>
                                    <div style={{alignItems: 'center', justifyContent: 'center', display:'flex'}}>
                                        <h5>Powered by AI</h5>
                                    </div>
                                    <div>
                                        <bold>Relevance</bold> {props.relevance} {relevanceMap(props.relevance)}
                                    </div>
                                    <div>
                                        <bold>Sentiment</bold> {parseFloat(props.sentiment).toFixed(2)} {SentimentMap(props.sentiment)}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </article> 
                </Router>
            )
        }
    }
}

export default BlogPost;