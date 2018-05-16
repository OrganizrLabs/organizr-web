// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { Select } from 'antd';
import Layout from 'components/Layout';
import Panel from 'components/Panel';
import Text from 'components/Text';
import { themes, primaryColors } from 'constants/styles';
import { changeTheme, changePrimaryColor } from 'store/app/appActions';
import { getTheme } from 'store/app/appSelectors';
import { type Theme } from 'types/Theme';

const Option = Select.Option;

type Props = {
  theme: Theme,
  themeName: string,
  onThemeChange: string => void,
  primaryColor: string,
  onPrimaryColorChange: string => void
};

type SettingRowProps = {
  title: string,
  content: React.Node,
  theme: Theme
};

const SettingRow = ({ title, content, theme }: SettingRowProps) =>
  <Row justify="space-between">
    <Text color={theme.color}>
      {title}
    </Text>
    <Flex>
      {content}
    </Flex>
  </Row>;

const Settings = ({
  theme,
  themeName,
  onThemeChange,
  primaryColor,
  onPrimaryColorChange
}: Props) => {
  const themeContent = (
    <SettingSelect
      size="large"
      defaultValue={themeName}
      onChange={onThemeChange}
    >
      {Object.keys(themes).map(themeKey =>
        <Option value={themeKey}>
          {themeKey}
        </Option>
      )}
    </SettingSelect>
  );
  const primaryColorObject = primaryColors.find(
    item => item.color === primaryColor
  ) || { title: 'Color not found' };
  const primaryColorContent = (
    <SettingSelect
      size="large"
      defaultValue={primaryColorObject.title}
      onChange={onPrimaryColorChange}
    >
      {primaryColors.map(({ title, color }) =>
        <Option value={color}>
          {title}
        </Option>
      )}
    </SettingSelect>
  );
  return (
    <Layout>
      <Panel title="Settings">
        <SettingRow theme={theme} title="Theme" content={themeContent} />
        <SettingRow
          theme={theme}
          title="Primary Color"
          content={primaryColorContent}
        />
      </Panel>
    </Layout>
  );
};

const Row = styled(Flex)`
  padding: 7px 0;
`;

const SettingSelect = styled(Select)`
  width: 150px;
`;

const mapStateToProps = ({ app, app: { theme, primaryColor } }) => ({
  theme: getTheme(app),
  themeName: theme,
  primaryColor
});

const mapDispatchToProps = (dispatch: Function) => ({
  onThemeChange: string => dispatch(changeTheme(string)),
  onPrimaryColorChange: string => dispatch(changePrimaryColor(string))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
