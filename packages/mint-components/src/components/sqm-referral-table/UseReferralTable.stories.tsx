import { setProgramId } from "@saasquatch/component-boilerplate";
import {
  setUserIdentity,
  useLazyQuery,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

export default {
  title: "Hooks / useReferralTable",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    // programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}

function setupGraphQLKlip({ token, id }) {
  const accountId = id;
  // const programId = "klip-referral-program";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    // programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: token,
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}
export const ReferralTable = createHookStory(() => {
  setupGraphQL();
  setProgramId("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-referral-table>
      <sqm-referral-table-user-column></sqm-referral-table-user-column>
      <sqm-referral-table-status-column></sqm-referral-table-status-column>
      <sqm-referral-table-date-column></sqm-referral-table-date-column>
      <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>
    </sqm-referral-table>
  );
});

export const ReferralTableDemoHook = createHookStory(() => {
  // setupGraphQL();
  // setProgramId("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-referral-table>
      <sqm-referral-table-user-column></sqm-referral-table-user-column>
      <sqm-referral-table-status-column></sqm-referral-table-status-column>
      <sqm-referral-table-date-column></sqm-referral-table-date-column>
      <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>
    </sqm-referral-table>
  );
});


export const ReferralTableDemoHookShowReferrer = createHookStory(() => {
  // setupGraphQL();
  // setProgramId("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-referral-table show-referrer="true">
      <sqm-referral-table-user-column></sqm-referral-table-user-column>
      <sqm-referral-table-status-column></sqm-referral-table-status-column>
      <sqm-referral-table-date-column></sqm-referral-table-date-column>
      <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>
    </sqm-referral-table>
  );
});

export const ReferralTableEn = createHookStory(() => {
  setupGraphQLKlip({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWVuZ2xpc2giLCJpZCI6InNhbWVuZ2xpc2gifX0._6OTVF3gcipu_ibgthUNr5UHwC-2E_lhCENI5HpYvcw",
    id: "samenglish",
  });
  setProgramId("klip-referral-program");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-referral-table per-page="4">
      <sqm-referral-table-user-column column-title="User"></sqm-referral-table-user-column>
      <sqm-referral-table-status-column column-title="Referral Status"></sqm-referral-table-status-column>
      <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>
      <sqm-referral-table-date-column
        column-title="Date Referred"
        date-shown="dateReferralStarted"
      ></sqm-referral-table-date-column>
    </sqm-referral-table>
  );
});

export const ReferralTableTr = createHookStory(() => {
  setupGraphQLKlip({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbXR1cmtleSIsImlkIjoic2FtdHVya2V5In19.usSMe0RWg8W5FtwcvJayvAlxTw6vMxjTyWXaP8jI8_U",
    id: "samturkey",
  });
  setProgramId("klip-referral-program");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-referral-table
      more-label="Daha"
      prev-label="Öncesi"
      empty-state-text="Henüz Ödül Yok"
      per-page="4"
    >
      <sqm-referral-table-user-column
        column-title="Kullanıcılar"
        anonymous-user="Anonim Kullanıcı"
        deleted-user="Silinmiş Kullanıcı"
      ></sqm-referral-table-user-column>
      <sqm-referral-table-status-column
        column-title="Durumu"
        converted-status-text="Dönüştür"
        in-progress-status-text="Devam etmekte"
      ></sqm-referral-table-status-column>
      <sqm-referral-table-rewards-column
        column-title="Ödüller"
        status-text="{status, select, AVAILABLE {Mevcut} CANCELLED {İptal edildi} PENDING {Bekliyor} EXPIRED {Süresi doldu} REDEEMED {Kullanıldı} other {Müsait değil} }"
        status-long-text="{status, select, AVAILABLE {Ödül süresi doluyor} CANCELLED {Ödül iptal edildi} PENDING {üzerinde mevcut} EXPIRED {Ödülün süresi doldu} other {Müsait değil} }"
        reward-received-text="Ödül şu tarihte alındı:"
      ></sqm-referral-table-rewards-column>
      <sqm-referral-table-date-column
        column-title="Tarih"
        date-shown="dateReferralStarted"
      ></sqm-referral-table-date-column>
    </sqm-referral-table>
  );
});

export const ReferralTableFr = createHookStory(() => {
  setupGraphQLKlip({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWZyZW5jaCIsImlkIjoic2FtZnJlbmNoIn19.cwhasHpfU5MLV4vGbCQcazb6p19iSw5pD2zyrVHgePg",
    id: "samfrench",
  });
  setProgramId("klip-referral-program");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-referral-table
      more-label="Plus"
      prev-label="Précédent"
      empty-state-text="Aucune Référence Maintenant"
      per-page="4"
    >
      <sqm-referral-table-user-column
        column-title="Utilisateur"
        anonymous-user="Utilisateur Anonyme"
        deleted-user="Utilisateur Supprimé"
      ></sqm-referral-table-user-column>
      <sqm-referral-table-status-column
        column-title="Statut de Parrainage"
        converted-status-text="Converti"
        in-progress-status-text="En cours"
      ></sqm-referral-table-status-column>
      <sqm-referral-table-rewards-column
        column-title="Récompenses"
        status-text="{status, select, AVAILABLE {Disponible} CANCELLED {Annulé} PENDING {En attente} EXPIRED {Expiré} REDEEMED {Racheté} other {Indisponible} }"
        status-long-text="{status, select, AVAILABLE {Récompense expirant sur} CANCELLED {Récompense annulée sur} PENDING {Disponible sur} EXPIRED {Récompense expirée sur} other {Indisponible} }"
        reward-received-text="Récompense reçue"
      ></sqm-referral-table-rewards-column>
      <sqm-referral-table-date-column
        column-title="Date de Référence"
        date-shown="dateReferralStarted"
      ></sqm-referral-table-date-column>
    </sqm-referral-table>
  );
});
