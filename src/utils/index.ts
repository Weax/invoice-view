//returns object with most properties
export const maxPropsLenght = <O extends Object>(data: O[]): O => data.reduce((prev, current) =>
    Object.keys(prev).length > Object.keys(current).length ? prev : current
)