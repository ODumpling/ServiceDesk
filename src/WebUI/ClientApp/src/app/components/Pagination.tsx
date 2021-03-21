import React from "react";

export function Pagination(props: {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    navigate(number: number): void;
    pageCount: number;
}) {
    const {currentPage, hasNextPage, hasPreviousPage, pageCount} = props;

    console.log('currentPage', currentPage)
    console.log('haspp', hasPreviousPage)
    console.log('hasnp', hasNextPage)

    return <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <div className="-mt-px w-0 flex-1 flex">
            <button
                disabled={!hasPreviousPage}
                onClick={() => props.navigate(currentPage - 1)}
                className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"/>
                </svg>
                Previous
            </button>
        </div>
        <div className="mx-auto">
            {/*    <a href="#"*/}
            {/*       className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">*/}
            {/*        1*/}
            {/*    </a>*/}
            {/*    <a href="#"*/}
            {/*       className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"*/}
            {/*       aria-current="page">*/}
            {/*        2*/}
            {/*    </a>*/}
            {/*    <a href="#"*/}
            {/*       className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">*/}
            {/*        3*/}
            {/*    </a>*/}
            {/*    <span*/}
            {/*        className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">*/}
            {/*    ...*/}
            {/*    </span>*/}
            {/*    <a href="#"*/}
            {/*       className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">*/}
            {/*        8*/}
            {/*    </a>*/}
            <div
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                Page: {currentPage} / {pageCount}
            </div>
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end">
            <button
                disabled={!hasNextPage}
                onClick={() => props.navigate(currentPage + 1)}
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Next
                <svg className="ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"/>
                </svg>
            </button>
        </div>
    </nav>;
}
