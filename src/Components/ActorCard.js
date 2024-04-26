import React, { useEffect, useState } from 'react';
import './actorCard.css';
import ActorDetails from './ActorDetails';
import { listData } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const ActorCard = () => {
    const [selectedActor, setSelectedActor] = useState(null);
    const [detailedActors, setDetailedActors] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const result = useSelector((state) => state.listReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true when fetching starts
                 dispatch(listData()); // Dispatch the action to fetch data
                setLoading(false); // Set loading to false when fetching completes
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [dispatch]);

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
                setDetailedActors(detailedActorData);
            }
        };
        fetchActorDetails();
    }, [result]);

    const handleShowDetails = (actor) => {
        setSelectedActor(actor);
    };

    const handleCloseDetails = () => {
        setSelectedActor(null);
    };

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className="actor-card-container">
            {detailedActors.map((actor) => (
                <div className="actor-card" key={actor.url}>
                    <div className="actor-card-content">
                        <div className='actor-card-content1'>
                            <h2 className="actor-name">{actor.name}</h2>
                            <p className="actor-info">Height: {actor.height}</p>
                            <p className="actor-info">Birth Year: {actor.birth_year}</p>
                        </div>
                        <div className='actor-card-detail'>
                            <button onClick={() => handleShowDetails(actor)}>Show Details</button>
                        </div>
                    </div>
                </div>
            ))}
            {selectedActor && <ActorDetails actor={selectedActor} onClose={handleCloseDetails} />}
        </div>
    );
};

export default ActorCard;
