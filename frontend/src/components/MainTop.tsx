
type Props = {username: string, topic: string}

export default function MainTop({username, topic}: Props) {
    return (
        <div className="mainTop">
            <div className="mainTopInfo">
                <div className="mainTopLeft">
                    <p>{topic}</p>
                    <h2>Welcome, {username}</h2>
                </div>
                {/* <div className="mainTopRight">
                    <div className="logo">
                        AL
                    </div>
                    <h2>Add Your Anime</h2>
                </div> */}
            </div>
            <div className="mainTopBottom" />
        </div>
    )
}