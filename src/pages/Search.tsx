import React, {Suspense, useState, useEffect, useMemo, useRef} from "react";
import {useNavigate} from "react-router-dom";
import AppHeader from "./../components/app-header";
import AppFooter from "./../components/app-footer";
import Button from "./../components/button";
import * as navigate from "./../includes/scripts/handleNavigation";
import Spinner from "./../components/spinner";
import * as searchAPI from "./../apis/handleImageSearch";
import db from "./../backend/db";
import CollectionPack from "./../components/collection-pack";
import $ from "jquery";

const Search = () =>{

    const [searchData, setSearchData] = useState<string>("");
    const [dataDonArrive, setDataDonArrive] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const navigateTo = useNavigate();
    let userSearchItem = " ";
    navigate.checkIfHomePageSeen();

    const test = () =>{
       navigateTo(`${searchData}`)
    }

    const navigateBack = () =>{
        navigateTo(`/search`);
    }
    
    useEffect(()=>{
        //if(searchAPI.searchImage("search-form"))
        const getData =  () =>{ 
            $("#search-form").on("submit", (e: any)=>{
                e.preventDefault();
                setFormSubmitted(true);
                setTimeout(()=>{
                       let searchResult = searchAPI.searchImage();
                        setDataDonArrive(true);
                        setSearchData(searchResult);
                       
                   }, 2000);
                setDataDonArrive(false);
            })  
           
        }

        getData();
    }); 


    return (
        <React.Fragment>
            <Suspense fallback={<Spinner/>}>
                    <Spinner/>
                    <section className="container-fluid p-0 d-flex flex-column">
                            <AppHeader title="Search Images" backButtonClick={navigateBack}/>
                                <br/>
                                <br/>
                                <br/>
                             <h3 className="fs-4 fw-bold text-start p-2 my-3 text-light text-capitalize">Bulk image downloader</h3>


                             <section className="form-container m-auto width-toggle-7">
                                <form className="d-flex align-items-center justify-content-center p-2" id="search-form">
                                  
                                        <input type="text" placeholder="search images eg bats, cars, gift" name="searchItem" id="image-search" className="form-control w-100 p-3 shadow brand-small-text-2 search-element" autoComplete={"false"}/>
                                    
                                </form>
                             </section>

                            <section className="search-results-container my-2">
                               {(dataDonArrive) && <p className="text-capitalize brand-small-text mx-2 text-light px-2">search results for <span className="brand-primary-text fw-bold" id="searchTerm" onClick={test}>{searchData}</span></p>} 
                                
                                {
                                    (!dataDonArrive && formSubmitted) && <section className="d-flex align-items-center justify-content-center m-auto py-4">
                                                                            <section className="dot-windmill"></section>
                                                                         </section>
                                } 
                            </section>

                            <section className="container">
                                <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                        <CollectionPack/>
                                        <CollectionPack/>
                                        <CollectionPack/>
                                        <CollectionPack/>
                                        <CollectionPack/>
                                        <CollectionPack/>
                                        <br/>

                                        <br/>

                                        <br/>
                                        <br/>

                                </section>

                            </section>
                             <AppFooter childrenSearchActivePage="current-active-page"/>
                    </section>
            </Suspense>
        </React.Fragment>
    )
}


export default Search;