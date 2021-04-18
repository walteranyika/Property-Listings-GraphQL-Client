import React from "react";
 import { useQuery, useMutation} from "@apollo/react-hooks";
import {Listings as ListingsData} from "./__generated__/Listings";
import {DeleteListing as DeleteListingData, DeleteListingVariables as DeleteListingVariables} from "./__generated__/DeleteListing";
import {gql} from "apollo-boost";
import {List, Avatar, Button, Spin, Alert} from 'antd';

import './styles/Listing.css'
import {ListingsSkeleton} from "../components/Listings";

const  LISTINGS =gql`
   query Listings{
   listings {
       id
       title
       image
       address
       price
       numOfGuests
       numOfBaths
       numOfBeds
       rating
     }
   }
`;

const  DELETE_LISTING=gql`
   mutation DeleteListing($id: ID!){
     deleteListing(id:$id){
       id
     }
   }
`;

interface Props {
   title:string
}
export const Listings =({title}:Props)=>{
    const {data, refetch, loading, error} = useQuery<ListingsData>(LISTINGS);

    const [deleteListing,{loading:deleteListingLoading,error:deleteListingError}]=
    useMutation<DeleteListingData,DeleteListingVariables>(DELETE_LISTING);

    const removeListing=async (id:string)=>{
        await deleteListing({variables:{id}});
        refetch();
    };
    const  listings = data? data.listings : null;

    const listingsListOld = listings? (
       <ul>
           {
               listings.map(listing=>{return(<li key={listing.id}>{listing.title} <button onClick={()=>removeListing(listing.id)}>Delete</button></li>)})
           }
       </ul>
    ):null;

    const listingsList = listings? (
        <List
            itemLayout="horizontal"
            dataSource={listings}
            renderItem={listing=>(
                <List.Item actions={[<Button danger size={"small"} onClick={()=>removeListing(listing.id)}>Delete</Button>]}>
                    <List.Item.Meta title={listing.title}
                                    description={listing.address}
                                    avatar={<Avatar src={listing.image} shape="square" size={48}/>}
                    />
                </List.Item>
            )}
          >
        </List>
    ):null;

    const deleteListingErrorMessage = deleteListingError?
        (<Alert
            message="Error"
            description="An error occured while deleting the element."
            type="error"
            showIcon
        />): null;

    if (error){
        return <div>
            <ListingsSkeleton title={title} error/>
        </div>
    }
    if (error){
        return <Alert
                message="Error"
                description="There was an error while loading."
                type="error"
                showIcon/>
    }
    return(
        <div className="listings">
            <h2>{title}</h2>
            <Spin spinning={deleteListingLoading}></Spin>
            {listingsList}
            {deleteListingErrorMessage}
        </div>)
};