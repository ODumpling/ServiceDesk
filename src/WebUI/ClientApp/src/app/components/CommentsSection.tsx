import React, {ReactNode} from "react";
import {Link, useParams} from "react-router-dom";
import {Formik, Form, Field} from "formik";
import {CreateComment} from "../api/web-client";


export function CommentsSection(props: { children?: ReactNode, title?: string, callback(command: CreateComment): void; }) {
    const {ticketId} = useParams()
    const initialValues: CreateComment = {description: '', ticketId};

    return (
        <section aria-labelledby="comments-title" className="pt-5">
            <div className="bg-white shadow sm:rounded-lg ">
                <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 id="comments-title" className="text-lg font-medium text-gray-900">{props.title}</h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                        <ul className="space-y-8 sm:overflow-y-auto h-64">
                            {props.children}
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                 alt=""/>
                        </div>
                        <div className="min-w-0 flex-1">
                            <Formik initialValues={initialValues}
                                    validate={value => {
                                        const errors: any = {};
                                        if (value.description === '') {
                                            return errors.description = "required"
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values) => {
                                        props.callback(values)
                                    }}>

                                {({handleSubmit, values, handleChange}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="comment" className="sr-only">About</label>
                                            <textarea id="comment" name="description" rows={3}
                                                      onChange={handleChange}
                                                      value={values.description}
                                                      className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                                                      placeholder="Add a note"/>
                                            <Field type="hidden" name="ticketId"></Field>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <Link to="#"
                                                  className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                                                {/*// <!-- Heroicon name: solid/question-mark-circle -->*/}
                                                <svg
                                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                    fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                <span>Some HTML is okay.</span>
                                            </Link>
                                            <button type="submit"
                                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                Comment
                                            </button>
                                        </div>
                                    </Form>
                                )}

                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
