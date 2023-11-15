import { Link } from "react-router-dom";

export default function GameListItem(
    {...data}
    // { title,
    //     category,
    //     imageUrl,
    //     _id
    // }
) {

    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={data.imageUrl} />
                <h6>{data.category}</h6>
                <h2>{data.title}</h2>
                <Link to={`/games/${data._id}`} className="details-button">Details</Link>
            </div>

        </div>
    )


}