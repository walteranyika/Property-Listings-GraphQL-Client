import {Alert, Divider, Skeleton} from "antd";

interface Props {
  title:string;
  error:boolean

}
export const ListingsSkeleton=({title, error=false}:Props)=>{
  const erroralert = error? <Alert
      message="Error"
      description="Ops, an error occurred. Please try again"
      type="error"
      closable
  />: null;
  return <div className="listings">
           <h2>{title}</h2>
           {erroralert}
          <Skeleton active paragraph={{rows:1}}/>
          <Divider/>
          <Skeleton active paragraph={{rows:1}}/>
           <Divider/>
          <Skeleton active paragraph={{rows:1}}/>
      </div>
}