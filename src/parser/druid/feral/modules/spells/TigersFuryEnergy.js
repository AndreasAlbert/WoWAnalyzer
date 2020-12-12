import React from 'react';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';
import Analyzer from 'parser/core/Analyzer';

import { t } from '@lingui/macro';

import EnergyTracker from '../features/EnergyTracker';
import Predator from '../talents/Predator';

class TigersFuryEnergy extends Analyzer {
  get shouldIgnoreEnergyWaste() {
    // If Predator is providing plenty of Tigers Fury resets it's no longer important to use them at the perfect time.
    return (this.predator.active && this.predator.extraCastsPerMinute > 1.0);
  }

  get suggestionThresholds() {
    const generated = this.energyTracker.getGeneratedBySpell(SPELLS.TIGERS_FURY.id);
    const wasted = this.energyTracker.getWastedBySpell(SPELLS.TIGERS_FURY.id);
    const wastedShare = (wasted / (generated + wasted)) || 0;
    return {
      actual: wastedShare,
      isGreaterThan: {
        minor: 0,
        average: 0.10,
        major: 0.25,
      },
      style: 'percentage',
    };
  }

  static dependencies = {
    energyTracker: EnergyTracker,
    predator: Predator,
  };

  suggestions(when) {
    if (this.shouldIgnoreEnergyWaste) {
      return;
    }

    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) => suggest(
      <>
        You are wasting energy generated by <SpellLink id={SPELLS.TIGERS_FURY.id} />. Usually your ability use will be limited by energy so it's important to make the most of this energy source. Spend energy before using <SpellLink id={SPELLS.TIGERS_FURY.id} /> so that it's not wasted. The main exception is if <SpellLink id={SPELLS.PREDATOR_TALENT.id} /> provides you with lots of resets in which case you can use it more freely.
      </>,
    )
      .icon(SPELLS.TIGERS_FURY.icon)
      .actual(t({
      id: "druid.feral.suggestions.tigerFuryEnergy.energyWasted",
      message: `${formatPercentage(actual)}% of generated energy wasted.`
    }))
      .recommended(`No waste is recommended`));
  }
}

export default TigersFuryEnergy;
