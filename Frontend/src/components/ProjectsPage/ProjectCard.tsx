import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  projectData: JsonApiProjectCardData;
}

interface JsonApiProjectCardData {
  drupal_internal__nid: number;
  title: string;
  field_image_url: Array<{
    uri: string;
    title: string;
    options: any[];
  }>;
  field_link: Array<{
    uri: string;
    title: string;
    options: any[];
  }>;
  field_project_description: string[];
  field_project_tiltle: string[];
  field_category?: {
    data: Array<{
      attributes: {
        name: string;
      };
    }>;
  };
  field_projects_categories: string[];
  [key: string]: any;
}

export default function ProjectCard({ projectData }: Props) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={projectData.field_image_url[0]?.uri}
        alt={projectData.field_project_tiltle[0]}
        style={{ objectFit: "cover", height: "300px" }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex py-4 justify-content-between align-items-center">
          <Card.Title className="mb-0">
            {projectData.title || "Untitled"}
          </Card.Title>
          {/* Dynamically display categories */}
          <span className="text-muted small">
            {projectData.field_projects_categories?.length
              ? projectData.field_projects_categories.join(" / ")
              : "Uncategorized"}
          </span>
        </div>
        <Card.Text>
          {projectData.field_project_description[0] ||
            "This is a placeholder description for the project."}
        </Card.Text>
        <div className="mt-auto">
          {projectData.field_link[0]?.uri && (
            <p className="text-primary my-2">
              <Link
                to={`/projects/${projectData.drupal_internal__nid}`} // Navigate to the dynamic project detail page
                style={{ textDecoration: "none", color: "black" }}
              >
                <span style={{ color: "red" }}>&rarr;</span> Read more
              </Link>
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
