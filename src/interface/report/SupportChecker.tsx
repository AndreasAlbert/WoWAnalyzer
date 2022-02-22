import isLatestPatch from 'game/isLatestPatch';
import { ignoreSpecNotSupportedWarning } from 'interface/actions/specNotSupported';
import { RootState } from 'interface/reducers';
import SupportCheckerSpecOutOfDate from 'interface/report/SupportCheckerSpecOutOfDate';
import SupportCheckerSpecPartialSupport from 'interface/report/SupportCheckerSpecPartialSupport';
import { getSpecsIgnoredNotSupportedWarning } from 'interface/selectors/skipSpecNotSupported';
import { WCLFight } from 'parser/core/Fight';
import { PlayerInfo } from 'parser/core/Player';
import Report from 'parser/core/Report';
import { ReactElement } from 'react';
import { connect } from 'react-redux';

import { useConfig } from './ConfigContext';

interface Props {
  children: ReactElement<any, any> | null;
  report: Report;
  fight: WCLFight;
  player: PlayerInfo;
  ignoreSpecNotSupportedWarning: (specId: number) => void;
  ignored: number[];
}

const SupportChecker = ({
  children,
  report,
  fight,
  player,
  ignored,
  ignoreSpecNotSupportedWarning,
}: Props) => {
  const config = useConfig();

  const handleClickContinue = () => {
    // I chose on purpose not to store this in a cookie since I don't want this to be forgotten. It should not be a big deal if this happens every time the page is loaded, so long as it isn't shown every fight.
    ignoreSpecNotSupportedWarning(config.spec.id);
  };

  const isIgnored = ignored.includes(config.spec.id);

  return (
    <>
      {!isIgnored && !isLatestPatch(config) ? (
        <SupportCheckerSpecOutOfDate
          report={report}
          fight={fight}
          player={player}
          config={config}
          onContinueAnyway={handleClickContinue}
        />
      ) : !isIgnored && config.isPartial ? (
        <SupportCheckerSpecPartialSupport
          report={report}
          fight={fight}
          player={player}
          config={config}
          onContinueAnyway={handleClickContinue}
        />
      ) : null}

      {children}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  ignored: getSpecsIgnoredNotSupportedWarning(state),
});
export default connect(mapStateToProps, {
  ignoreSpecNotSupportedWarning,
})(SupportChecker);
