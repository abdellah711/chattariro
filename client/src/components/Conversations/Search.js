import styled from 'styled-components'

const Search = ({value,onType,...rest}) => {
    return (
        <StyledSearch
            placeholder="Search ..."
            value={value}
            onChange={onType}
            name="search"
            type="search"
            autoComplete="false"
            {...rest}
        />
    )
}

const StyledSearch = styled.input`
    outline: none;
    background-color: var(--input-bg);
    color:inherit;
    font-family: inherit;
    border-radius: 12px;
    border: 1px solid var(--input-ph);
    padding: .5em .7em;
    font-size:1rem;
    transition: border .3s;
    :focus{
        border: 2px solid var(--primary);
    }
`
export default Search
