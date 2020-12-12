import React from 'react';

import { formatPercentage } from 'common/format';

import Analyzer from 'parser/core/Analyzer';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import ResourceBreakdown from 'parser/shared/modules/resources/resourcetracker/ResourceBreakdown';
import Panel from 'interface/others/Panel';

import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';
import Statistic from 'interface/statistics/Statistic';

import { t } from '@lingui/macro';

import BoringResourceValue from 'interface/statistics/components/BoringResourceValue';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';

import RunicPowerTracker from './RunicPowerTracker';

class RunicPowerDetails extends Analyzer {
  static dependencies = {
    runicPowerTracker: RunicPowerTracker,
  };

  protected runicPowerTracker!: RunicPowerTracker;

  get wastedPercent() {
    return this.runicPowerTracker.wasted / (this.runicPowerTracker.wasted + this.runicPowerTracker.generated) || 0;
  }

  get efficiencySuggestionThresholds() {
    return {
      actual: 1 - this.wastedPercent,
      isLessThan: {
        minor: 0.95,
        average: 0.90,
        major: .85,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  get suggestionThresholds() {
    return {
      actual: this.wastedPercent,
      isGreaterThan: {
        minor: 0.05,
        average: 0.1,
        major: .15,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) => suggest(`You wasted ${formatPercentage(this.wastedPercent)}% of your Runic Power.`)
      .icon('inv_sword_62')
      .actual(t({
      id: "deathknight.unholy.suggestions.runicPower.wasted",
      message: `${formatPercentage(actual)}% wasted`
    }))
      .recommended(`<${formatPercentage(recommended)}% is recommended`));
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.CORE(3)}
        size="small"
        tooltip={`${this.runicPowerTracker.wasted} out of ${this.runicPowerTracker.wasted + this.runicPowerTracker.generated} runic power wasted.`}
      >
        <BoringResourceValue
          resource={RESOURCE_TYPES.RUNIC_POWER}
          value={`${formatPercentage(this.wastedPercent)} %`}
          label="Runic Power wasted"
        />
      </Statistic>
    );
  }

  tab() {
    return {
      title: 'Runic Power usage',
      url: 'runic-power-usage',
      render: () => (
        <Panel>
          <ResourceBreakdown
            tracker={this.runicPowerTracker}
            showSpenders
          />
        </Panel>
      ),
    };
  }

}

export default RunicPowerDetails;
