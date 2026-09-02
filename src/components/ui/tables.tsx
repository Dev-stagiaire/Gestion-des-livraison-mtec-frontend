import type { ReactNode } from "react";

interface TableProps{
    headers: string[];
    rows: ReactNode[][];
}

const Table = ({headers, rows }: TableProps) => {



  return (

    <div className="mx-auto w-full h-full overflow-x-auto">
        <table className="w-full divide-y-2 divide-gray-100">
            <thead className="ltr:text-left rtl:text-right">
                <tr className="*:text-gray-900 *:font-medium item">
                    {headers 
                        ? headers.map((header) => {
                            return(
                                <th className="px-3 py-3 whitespace-nowrap">
                                    {header}
                                </th>
                            );
                    })
                    : <th className="px-3 py-2 whitespace-nowrap"></th>
                    }
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {rows
                    ? rows.map((row, rowIndex) => {
                        return(
                            <tr key={rowIndex} className="*:first:font-medium *:first:text-gray-900 text-sm text-gray-500">
                                {row.map((cell, cellIndex) => {
                                    return(
                                        <td key={cellIndex} className="px-3 py-4 whitespace-nowrap">{cell}</td>
                                    );
                                })

                                }
                            </tr>
                        );
                    })
                    : <tr className="*:item *:first:font-medium"></tr>
                }
           
            </tbody>
        </table>
    </div>
  )
}

export default Table