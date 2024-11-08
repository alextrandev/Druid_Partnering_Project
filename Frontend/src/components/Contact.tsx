import { useEffect, useState } from 'react';
import fetchContentFromDrupal, { JsonApiDataAttributes } from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';
import ContactForm from './ContactForm';
import { Container } from 'react-bootstrap';
import ContactPageTeam from './ContactPageTeam';

const Contact: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
    const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);
    const [contactPageData, setContactPageData] = useState<JsonApiDataAttributes | null>(null);
    const [teamMembersData, setTeamMembersData] = useState<JsonApiDataAttributes | null>(null);

    useEffect(() => {
        if (!jsonApiLinksLoading) {
            const fetchData = async () => {
                const pageData = await fetchContentFromDrupal(
                    jsonApiLinks["node--contact_page"]
                );
                setContactPageData(pageData.data[0]);
                const teamData = await fetchContentFromDrupal(
                    jsonApiLinks["node--team_member"]
                );
                setTeamMembersData(teamData.data)
            };
            fetchData();
        }
    }, [jsonApiLinksLoading]);

    if (!contactPageData) {
        return <p>Loading</p>;
    }

    const {
        field_first_section_header,
        field_first_section_paragraph,
        field_second_section_header,
        field_second_section_paragraph
    } = contactPageData;

    type ContactPageField = {
        value: string;
        format: string;
        processed: string;
    };

    return (
        <Container fluid className='p-0'>
            <Container fluid className='p-5 pb-1'>
                <h1 className='my-3 d-flex gap-2'>
                    {field_first_section_header.map((span: ContactPageField, index: number) => (
                        <span key={index} dangerouslySetInnerHTML={{ __html: span.processed }} />
                    ))}
                </h1>
                <p style={{ maxWidth: "500px" }} className='d-flex flex-column gap-3'>
                    {field_first_section_paragraph.map((span: ContactPageField, index: number) => (
                        <span key={index} dangerouslySetInnerHTML={{ __html: span.processed }} />
                    ))}
                </p>
            </Container>
            <Container fluid className='p-5'>
                <h1 className='my-3 d-flex gap-2'>
                    {field_second_section_header.map((span: ContactPageField, index: number) => (
                        <span key={index} dangerouslySetInnerHTML={{ __html: span.processed }} />
                    ))}
                </h1>
                <p style={{ maxWidth: "500px" }} className='d-flex flex-column gap-3'>
                    {field_second_section_paragraph.map((span: ContactPageField, index: number) => (
                        <span key={index} dangerouslySetInnerHTML={{ __html: span.processed }} />
                    ))}
                </p>
            </Container>

            <ContactPageTeam teamMembersData={teamMembersData} />

            <ContactForm />
        </Container>
    )
}

export default Contact;