import React, {useEffect} from "react";
import {DeskTile} from "../components/DeskTile";
import {useDispatch, useSelector} from "react-redux";
import {getDeskListAsync, selectDeskList} from "../features/desk/deskSlice";

export default function Dashboard() {

    const dispatch = useDispatch();

    const desks = useSelector(selectDeskList);

    useEffect(() =>{
        dispatch(getDeskListAsync(1, 10))
    },[dispatch])

    return (
        <section aria-labelledby="quick-links-title">
            <div
                className="rounded-lg overflow-hidden shadow-2xl divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                <h2 className="sr-only" id="quick-links-title">Quick links</h2>
                {desks.items?.map((desk) => (
                    <DeskTile key={desk.id} desk={desk}/>
                )) ?? "No Desks Available"}
            </div>
        </section>
    )
}
