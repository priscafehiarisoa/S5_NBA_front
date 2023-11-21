import React, {useState,useEffect} from 'react'
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
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Link } from 'react-router-dom';
import backendConfig from '@/configs/config';

export const Team = () => {
  const [team, setTeam] = useState([]);
  const link = `http://${backendConfig.host}:${backendConfig.port}`;
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(link+"/equipe");

        console.log(link+"/equipe")
        // console.log(response.data);
        setTeam(response.data);
        // Handle the response data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors
      }
    };

    fetchData();
    // setTeam([
    //   {
    //     "nomEquipe": "Lakers",
    //     "id": 1
    //   },
    //   {
    //     "nomEquipe": "Cleeveland",
    //     "id": 2
    //   },
    //   {
    //     "nomEquipe": "Box",
    //     "id": 3
    //   }
    // ])

  }, [])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Liste des équipes
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Equipe", ""].map((el) => (
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
              {team.map(
                (equipe) => {
                  const className = `py-3 px-5 ${
                    equipe.id === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={equipe.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {equipe.nomEquipe}
                            </Typography>

                          </div>
                        </div>
                      </td>

                      <td className={className}>
                        <Link
                          to={`/dashboard/joueurs/${equipe.id}`}
                        >
                        <Chip

                          variant="gradient"
                          color={"blue"}
                          value={"Info"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                        </Link>
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

