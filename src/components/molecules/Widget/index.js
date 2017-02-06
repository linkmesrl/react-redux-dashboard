import React, { PropTypes } from 'react';
import { Box } from 'components';

const Widget = ({ className, WidgetComponent, onRemovePlugin, title, data, uuid, dashboard, layout }) => (
  <div className={className}>
    <Box title={title} onRemove={onRemovePlugin(uuid)} overflow={'hidden'}>
      <div style={{ overflow: 'hidden' }}>
        <WidgetComponent uuid={uuid} dashboard={dashboard} layout={layout} />
      </div>
    </Box>
  </div>
);

Widget.propTypes = {
  WidgetComponent: PropTypes.func.isRequired
}

export default Widget;
