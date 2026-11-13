import { setProgramId } from "@saasquatch/component-boilerplate";
import {
  useLazyQuery,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

export default {
  title: "Hooks / useRewardsTable",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;

  useCannedEnvironment({ user: { id, accountId } });

  return { id, accountId };
}

function setupGraphQLKlip({ id, locale }: { id: string; locale: string }) {
  const accountId = id;
  // const programId = "klip-referral-program";

  useCannedEnvironment({ user: { id, accountId }, widgetIdent: { locale } });

  return { id, accountId };
}

export const RewardTableDemoHook = createHookStory(() => {
  // setupGraphQL();
  // setProgramId("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-rewards-table per-page="4">
    <sqm-rewards-table-reward-column></sqm-rewards-table-reward-column>
    <sqm-rewards-table-source-column></sqm-rewards-table-source-column>
    <sqm-rewards-table-status-column></sqm-rewards-table-status-column>
    <sqm-rewards-table-date-column></sqm-rewards-table-date-column>
  </sqm-rewards-table>
  );
});
export const RewardsTableWithProgram = createHookStory(() => {
  setupGraphQL();
  setProgramId("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-rewards-table>
      <sqm-rewards-table-reward-column></sqm-rewards-table-reward-column>
      <sqm-rewards-table-status-column></sqm-rewards-table-status-column>
      <sqm-rewards-table-source-column></sqm-rewards-table-source-column>
      <sqm-rewards-table-date-column></sqm-rewards-table-date-column>
    </sqm-rewards-table>
  );
});

export const RewardsTableNoProgram = createHookStory(() => {
  setupGraphQL();
  setProgramId(undefined);
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-rewards-table>
      <sqm-rewards-table-reward-column></sqm-rewards-table-reward-column>
      <sqm-rewards-table-status-column></sqm-rewards-table-status-column>
      <sqm-rewards-table-source-column></sqm-rewards-table-source-column>
      <sqm-rewards-table-date-column></sqm-rewards-table-date-column>
    </sqm-rewards-table>
  );
});

export const RewardsTableEn = createHookStory(() => {
  setupGraphQLKlip({
    id: "samenglish",
    locale: "en",
  });
  setProgramId(undefined);
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-rewards-table per-page="4">
      <sqm-rewards-table-reward-column></sqm-rewards-table-reward-column>
      <sqm-rewards-table-status-column></sqm-rewards-table-status-column>
      <sqm-rewards-table-source-column></sqm-rewards-table-source-column>
      <sqm-rewards-table-date-column></sqm-rewards-table-date-column>
    </sqm-rewards-table>
  );
});

export const RewardsTableTr = createHookStory(() => {
  setupGraphQLKlip({
    id: "samturkey",
    locale: "tr",
  });
  setProgramId(undefined);
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-rewards-table
      per-page="4"
      more-label="Daha"
      prev-label="Öncesi"
      empty-state-text="Henüz Referans Yok"
    >
      <sqm-rewards-table-reward-column
        column-title="Ödüller"
        redeemed-text="{redeemedAmount} kullanıldı"
        available-text="{availableAmount} mevcut"
      ></sqm-rewards-table-reward-column>
      <sqm-rewards-table-source-column
        column-title="Kullanıcılar"
        anonymous-user="Anonim Kullanıcı"
        deleted-user="Silinmiş Kullanıcı"
        reward-exchange-text="Ödülleri Kulannın"
        referral-text="{rewardSource, select, FRIEND_SIGNUP {Referans} REFERRED {Yönlendiren} other {}}"
        reward-source-text="{rewardSource, select, MANUAL {Manuel} AUTOMATED {Otomatik} other {}}"
      ></sqm-rewards-table-source-column>
      <sqm-rewards-table-status-column
        column-title="Statut"
        status-text="{status, select, AVAILABLE {Mevcut} PENDING {Bekleniyor} EXPIRED {Geçmiş} REDEEMED {Kullanılmış} CANCELED {İptal Edildi} other {Kullanılamaz} }"
        expiry-text="Bitiyor "
      ></sqm-rewards-table-status-column>
      <sqm-rewards-table-date-column column-title="Tarih"></sqm-rewards-table-date-column>
    </sqm-rewards-table>
  );
});

export const RewardsTableFr = createHookStory(() => {
  setupGraphQLKlip({
    id: "samfrench",
    locale: "fr",
  });
  setProgramId(undefined);
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-rewards-table
      per-page="4"
      more-label="Plus"
      prev-label="Précédent"
      empty-state-text="Aucune Récompenses Maintenant"
    >
      <sqm-rewards-table-reward-column
        column-title="Récompenses"
        redeemed-text="{redeemedAmount} rachetée"
        available-text="{availableAmount} disponible"
      ></sqm-rewards-table-reward-column>
      <sqm-rewards-table-source-column
        column-title="Utilisateur"
        anonymous-user="Utilisateur Anonyme"
        deleted-user="Utilisateur Supprimé"
        reward-exchange-text="Échange de Récompenses"
        referral-text="{rewardSource, select, FRIEND_SIGNUP {Référence à} REFERRED {Référencé par} other {}}"
        reward-source-text="{rewardSource, select, MANUAL {Manuel} AUTOMATED {Automatique} other {}}"
      ></sqm-rewards-table-source-column>
      <sqm-rewards-table-status-column
        column-title="Statut"
        status-text="{status, select, AVAILABLE {Disponible} PENDING {Pendant} EXPIRED {Expiré} REDEEMED {Racheté} CANCELED {Annulé} other {Indisponible} }"
        expiry-text="Expire sur "
      ></sqm-rewards-table-status-column>
      <sqm-rewards-table-date-column column-title="Date de Réception"></sqm-rewards-table-date-column>
    </sqm-rewards-table>
  );
});
