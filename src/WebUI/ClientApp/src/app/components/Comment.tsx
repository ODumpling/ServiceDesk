import {Link} from "react-router-dom";
import React from "react";
import {CommentDto} from "../api/web-client";


//TODO:: Make Dynamic
export function Comment(props: { comment: CommentDto }) {
    const {comment} = props

    return (
        <li>
            <div className="flex space-x-3">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=2irBzx0ccb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                         alt=""/>
                </div>
                <div>
                    <div className="text-sm">
                        <Link to="#" className="font-medium text-gray-900">Leslie Alexander</Link>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                        <p>
                            {comment.description}
                        </p>
                    </div>
                    <div className="mt-2 text-sm space-x-2">
                        <span className="text-gray-500 font-medium">{comment.created}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}
