// CSS Import
import { Dropdown, DropdownButton } from "react-bootstrap"
import "./Dropdowns.css"
import { CategoryDropdown } from "./categoryDropdown"

// All other imports:



export const HomeFilterDropdown = () => {
    return (
        <DropdownButton id="filter-dropdown" title="Filters">
            <Dropdown.ItemText>Filter by:</Dropdown.ItemText>
            <Dropdown.Item as="button">Date</Dropdown.Item>
            <Dropdown.Item as="button">Group</Dropdown.Item>
            <Dropdown.Item as="button"><CategoryDropdown/></Dropdown.Item>
        </DropdownButton>
    )
}