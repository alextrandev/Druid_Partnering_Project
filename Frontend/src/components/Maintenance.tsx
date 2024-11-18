import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPageData } from "../features/drupalData/drupalSlice";
import { RootState } from "../store/store";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

export default function Maintenance() {
  const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;
  const dispatch = useDispatch();
  const maintenanceData = useSelector(
    (state: RootState) => state.drupal.pageData.maintenance
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${drupalUrl}node/service?filter[title]=Maintenance&include=field_maintenance_intro,field_magical_support_team,field_magical_team_advantages,field_transition_section,field_web_solutions`
        );

        const maintenanceNode = data.data.find(
          (node: any) => node.attributes.title === "Maintenance"
        );

        if (maintenanceNode) {
          const includedData = data.included || [];
          dispatch(
            setPageData({
              page: "maintenance",
              data: {
                ...maintenanceNode,
                included: includedData,
              },
            })
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!maintenanceData) {
      fetchData();
    }
  }, [drupalUrl, dispatch, maintenanceData]);

