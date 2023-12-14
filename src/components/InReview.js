import React from "react";
import '../styling/InReview.css'
import MenuButton from "./MenuButton";

const InReview = () => {
    return(
        <div className="InReview">
            <div className="InReviewTop">
                Inreview
            </div>
            <MenuButton label="Requirement1"></MenuButton>
            <MenuButton label="Requirement2"></MenuButton>
            <MenuButton label="Requirement3"></MenuButton>
        </div>
    );
};


export default InReview;