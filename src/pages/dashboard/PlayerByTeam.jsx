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
import { Link, useParams } from 'react-router-dom';


export const PlayerByTeam = () => {
    const [joueurs, setJoueurs] = useState([]);
    let {idequipe}=useParams();
    const link = `http://${backendConfig.host}:${backendConfig.port}`;
    useEffect(() => {
      const fetchData = async () => {
        try {

          const response = await axios.get(link+"/Joueur/"+idequipe);

          console.log(link+"/Joueur/AllJouer/")
          // console.log(response.data);
          setJoueurs(response.data);
          console.log(joueurs)
          console.log(idequipe)
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
              Liste des joueurs
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nom", "Poste", "Equipe",""].map((el) => (
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
                {joueurs.map(
                  (joueur) => {
                    const className = `py-3 px-5 ${
                      joueur.id === authorsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={joueur.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {joueur.nom}
                              </Typography>

                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {joueur.poste}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {joueur.equipe.nomEquipe}
                          </Typography>
                        </td>
                        <td className={className}>
                        <Link
                          to={`/dashboard/joueurs/action/${joueur.id}`}
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

