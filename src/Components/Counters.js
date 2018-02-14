import React from 'react';
import { Icon, Label } from 'semantic-ui-react';

const Counters = ({comments, votes}) => (
    <div style={{"display":"inline"}}>
        <Label>
            <Icon name='comments outline' />
            {comments}
            <Label.Detail>Comments</Label.Detail>
        </Label>
        <Label>
            <Icon name='heart' />
            {votes}
            <Label.Detail>Votes</Label.Detail>
        </Label>
    </div>
);

export default Counters;