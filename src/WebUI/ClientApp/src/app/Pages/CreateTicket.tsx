import React, {Fragment, useEffect, useState} from "react";
import {CreateTicketCommand, DeskDto} from '../api/web-client';
import {useParams, useHistory} from "react-router-dom";
import {Form, Formik} from "formik"
import {API} from "../api/api-helper";

export default function CreateTicket() {
    const [desk, setDesk] = useState<DeskDto | undefined>({});

    const {slug} = useParams();
    const path = useHistory();

    useEffect(() => {
        getDesk(slug)
    }, [slug])

    async function submitTicket(command: CreateTicketCommand) {
        const client = await API.TicketClient();
        client.createTicket(slug, command).then((res) => path.push('/desk/' + desk?.slug))
    }

    async function getDesk(slug: string) {
        const client = await API.DeskClient();
        client.getDesk(slug).then((data) => setDesk(data.desk))
    }

    const formValues: CreateTicketCommand = {issue: '', description: ''}

    return (
        <Fragment>
            <div className="px-4 py-5 sm:px-6 bg-white rounded shadow mb-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Create a Ticket for : {desk?.name} .
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Description: {desk?.description}
                </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">

                <Formik initialValues={formValues}

                        validate={values => {
                            const errors: any = {};
                            if (!values.issue) {
                                errors.issue = 'Required';
                            }
                            if (!values.description) {
                                errors.description = 'Required';
                            }
                            return errors;
                        }}

                        onSubmit={(values, actions) => {
                            submitTicket(values)
                        }}>
                    {({values, handleChange, handleSubmit}) => (

                        <Form onSubmit={handleSubmit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                    <div>
                                        <label htmlFor="issue" className="sr-only">Issue</label>
                                        <select id="issue" name="issue"
                                                onChange={handleChange}
                                                value={values.issue}
                                                className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded bg-transparent focus:z-10 sm:text-sm border-gray-300">
                                            <option></option>
                                            {
                                                desk?.issues?.map((issue) => (
                                                    <option key={issue.name}>{issue.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="description"
                                               className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <div className="mt-1">
                                <textarea id="description" name="description" rows={5}
                                          onChange={handleChange}
                                          value={values.description}
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                          placeholder="you@example.com"/>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Please give a description of your issue with as much detail as possible about the issue 
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>

                    )}


                </Formik>
            </div>
        </Fragment>
    );
}
