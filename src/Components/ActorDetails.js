// ActorDetails.js
import React, { useEffect, useState } from 'react';
import { listData } from '../redux/action';
import { useSelector } from 'react-redux';
import './actorDetails.css';

const ActorDetails = ({ actor, onClose }) => {
    const [detailedActor, setDetailedActor] = useState(null);
    const result = useSelector((state) => state.listReducer);

    useEffect(() => {
        const fetchActorDetails = async () => {
            if (result.length > 0) {
                const detailedActorData = await Promise.all(
                    result.map(async (actor) => {
                        const films = await Promise.all(actor.films.map(url => fetch(url).then(response => response.json())));
                        const starships = await Promise.all(actor.starships.map(url => fetch(url).then(response => response.json())));
                        return { ...actor, films, starships };
                    })
                );
                setDetailedActor(detailedActorData.find(item => item.url === actor.url));
            }
        };
        fetchActorDetails();
    }, [actor, result]);

    return (
        <div className="actor-details-overlay">
            {detailedActor && (
                <div className="actor-details">
                    <div className="actor-card-content">
                        <div className='actor-card-content1'>
                            <p className="actor-info">Gender: {detailedActor.gender}</p>
                            <p className="actor-info">Mass: {detailedActor.mass}</p>
                            <p className="actor-info">Skin color: {detailedActor.skin_color}</p>
                            <p className="actor-info">Eye color: {detailedActor.eye_color}</p>
                    
                            

                            {detailedActor.vehicles && detailedActor.vehicles.length > 0 && (
                                <div className="actor-vehicles">
                                    <h3>Vehicles:</h3>
                                    <ul>
                                        {detailedActor.vehicles.map((vehicle, index) => (
                                            <li key={index}>{vehicle.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="actor-movies">
                                <h3>Movies:</h3>
                                <ul>
                                    {detailedActor.films.map((film, index) => (
                                        <li key={index}>{film.title}</li>
                                    ))}
                                </ul>
                            </div>

                            {detailedActor.starships && detailedActor.starships.length > 0 && (
                                <div className="actor-starships">
                                    <h3>Starships:</h3>
                                    <ul>
                                        {detailedActor.starships.map((starship, index) => (
                                            <li key={index}>{starship.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='actor-card-detail'>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActorDetails;
