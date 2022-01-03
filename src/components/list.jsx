export const List = ({ title, ingredients, timetocook, image, handledetails }) => {
     
    // console.log(title, status, id)
    return (
        <div className="alltask">
            <p>{title}</p>
            <p>{timetocook}</p>
            <img src={image} alt="" onClick={()=> handledetails(title, ingredients, timetocook, image)}/>
            </div>
    )
 }