// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from 'store/app/appSelectors';
import { type Theme } from 'types/Theme';

type Props = {
  className?: string,
  title?: string,
  children?: React.Node,
  theme: Theme,
  primaryColor: string
};

const Panel = ({
  className,
  children,
  title,
  theme,
  primaryColor,
  ...otherProps
}: Props) => {
  console.log(primaryColor);
  return (
    <PanelWrapper auto column className={className} {...otherProps}>
      <PanelContent auto column theme={theme}>
        {title &&
          <Title primaryColor={primaryColor}>
            {title}
          </Title>}
        {children}
      </PanelContent>
    </PanelWrapper>
  );
};

const Title = styled.h2`
  color: ${({ primaryColor }) => primaryColor};
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ primaryColor }) => primaryColor};
  margin-bottom: 10px;
`;

const PanelWrapper = styled(Flex)`
  width: 100%;
`;

const PanelContent = styled(Flex)`
  margin: 30px;
  border-radius: 3px;
  padding: 15px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

const mapStateToProps = ({ app, app: { primaryColor } }) => ({
  theme: getTheme(app),
  primaryColor
});

export default connect(mapStateToProps)(Panel);
