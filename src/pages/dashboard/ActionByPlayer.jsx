import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";
import { authorsTableData, projectsTableData } from "@/data";
import {useState, useEffect} from "react";
import backendConfig from '@/configs/config';
import axios from "axios";
import { useParams } from 'react-router-dom';

export const ActionByPlayer = () => {
    const [actions, setActions] = useState([]);
    let {idjoueur}=useParams();
    const link = `http://${backendConfig.host}:${backendConfig.port}`;
    useEffect(() => {
      const fetchData = async () => {
        try {

          const response = await axios.get(link+"/action/"+idjoueur);

        //   console.log(link+"/Joueur/AllJouer/")
          // console.log(response.data);
          setActions(response.data);
          // Handle the response data
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle errors
        }
      };

      fetchData();


    }, [])
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Liste des actions
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Action", "Total", "Taux de réussite"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {actions.map(
                  (action) => {
                    const className = `py-3 px-5 ${"border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr >
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {action.type_action}
                              </Typography>

                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {action.total_actions}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {action.taux_reussite}
                          </Typography>
                        </td>

                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>

      </div>
  )
}

