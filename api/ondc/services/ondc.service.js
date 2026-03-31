/**
 * ONDC Mock Service Layer
 *
 * Generates realistic mock ONDC TRV11 (metro/mobility) responses.
 * Replace these with real ONDC gateway calls during full integration.
 */

const { buildContext } = require('../utils/context.builder');

// ─── Mock Metro Catalog ─────────────────────────────────────────────────
const MOCK_METRO_CATALOG = {
  'bpp/descriptor': {
    name: 'Chennai Metro Rail Limited',
    short_desc: 'CMRL Metro Service',
    images: [{ url: 'https://chennaimetrorail.org/logo.png' }],
  },
  'bpp/providers': [
    {
      id: 'CMRL',
      descriptor: {
        name: 'Chennai Metro Rail',
        short_desc: 'Chennai Metro Rail transit service',
      },
      categories: [
        { id: 'METRO', descriptor: { name: 'Metro', code: 'METRO' } },
      ],
      items: [
        {
          id: 'CMRL-SGL-TRIP',
          descriptor: {
            name: 'Single Journey Ticket',
            short_desc: 'One-way metro ticket',
            code: 'SJT',
          },
          price: { currency: 'INR', value: '40' },
          category_id: 'METRO',
          fulfillment_id: 'CMRL-FULFILL-1',
        },
        {
          id: 'CMRL-RETURN-TRIP',
          descriptor: {
            name: 'Return Journey Ticket',
            short_desc: 'Round-trip metro ticket',
            code: 'RJT',
          },
          price: { currency: 'INR', value: '70' },
          category_id: 'METRO',
          fulfillment_id: 'CMRL-FULFILL-1',
        },
      ],
      fulfillments: [
        {
          id: 'CMRL-FULFILL-1',
          type: 'ROUTE',
          stops: [
            {
              id: 'CMRL-WMSTN',
              descriptor: { name: 'Wimco Nagar', code: 'WMSTN' },
              location: { gps: '13.1506,80.3058' },
              type: 'START',
            },
            {
              id: 'CMRL-ARPT',
              descriptor: { name: 'Chennai Airport', code: 'ARPT' },
              location: { gps: '12.9941,80.1709' },
              type: 'END',
            },
          ],
        },
      ],
    },
  ],
};

// ─── Service Methods ────────────────────────────────────────────────────

/**
 * Handle /search — discover metros, routes, tickets
 */
function handleSearch(requestBody) {
  const incomingCtx = requestBody.context || {};
  const context = buildContext('on_search', {
    transaction_id: incomingCtx.transaction_id,
    message_id: incomingCtx.message_id,
    bpp_id: 'cmrl.ondc.org',
    bpp_uri: 'https://cmrl.ondc.org/ondc',
  });

  return {
    context,
    message: {
      catalog: MOCK_METRO_CATALOG,
    },
  };
}

/**
 * Handle /select — select a specific metro item/route
 */
function handleSelect(requestBody) {
  const incomingCtx = requestBody.context || {};
  const selectedItem = requestBody.message?.order?.items?.[0] || { id: 'CMRL-SGL-TRIP' };

  const context = buildContext('on_select', {
    transaction_id: incomingCtx.transaction_id,
    message_id: incomingCtx.message_id,
  });

  return {
    context,
    message: {
      order: {
        provider: {
          id: 'CMRL',
          descriptor: { name: 'Chennai Metro Rail' },
        },
        items: [
          {
            id: selectedItem.id || 'CMRL-SGL-TRIP',
            descriptor: { name: 'Single Journey Ticket', code: 'SJT' },
            price: { currency: 'INR', value: '40' },
            quantity: { selected: { count: 1 } },
          },
        ],
        quote: {
          price: { currency: 'INR', value: '40' },
          breakup: [
            {
              title: 'Base Fare',
              price: { currency: 'INR', value: '35' },
            },
            {
              title: 'GST',
              price: { currency: 'INR', value: '5' },
            },
          ],
        },
      },
    },
  };
}

/**
 * Handle /init — initialize an order
 */
function handleInit(requestBody) {
  const incomingCtx = requestBody.context || {};

  const context = buildContext('on_init', {
    transaction_id: incomingCtx.transaction_id,
    message_id: incomingCtx.message_id,
  });

  return {
    context,
    message: {
      order: {
        provider: { id: 'CMRL' },
        items: [
          {
            id: 'CMRL-SGL-TRIP',
            quantity: { selected: { count: 1 } },
          },
        ],
        billing: {
          name: 'Indicabs User',
          email: 'user@indicabs.net',
          phone: '+919876543210',
        },
        fulfillment: {
          id: 'CMRL-FULFILL-1',
          type: 'ROUTE',
          stops: [
            { id: 'CMRL-WMSTN', type: 'START' },
            { id: 'CMRL-ARPT', type: 'END' },
          ],
        },
        quote: {
          price: { currency: 'INR', value: '40' },
        },
        payment: {
          type: 'PRE-ORDER',
          status: 'NOT-PAID',
          collected_by: 'BAP',
        },
      },
    },
  };
}

/**
 * Handle /confirm — confirm a booking
 */
function handleConfirm(requestBody) {
  const incomingCtx = requestBody.context || {};

  const context = buildContext('on_confirm', {
    transaction_id: incomingCtx.transaction_id,
    message_id: incomingCtx.message_id,
  });

  const orderId = `INDI-METRO-${Date.now()}`;

  return {
    context,
    message: {
      order: {
        id: orderId,
        state: 'CONFIRMED',
        provider: { id: 'CMRL' },
        items: [
          {
            id: 'CMRL-SGL-TRIP',
            descriptor: { name: 'Single Journey Ticket' },
            quantity: { selected: { count: 1 } },
          },
        ],
        fulfillment: {
          id: 'CMRL-FULFILL-1',
          type: 'ROUTE',
          state: { descriptor: { code: 'TICKET_ISSUED' } },
          stops: [
            { id: 'CMRL-WMSTN', type: 'START' },
            { id: 'CMRL-ARPT', type: 'END' },
          ],
        },
        payment: {
          type: 'PRE-ORDER',
          status: 'PAID',
          params: {
            amount: '40',
            currency: 'INR',
            transaction_id: `TXN-${Date.now()}`,
          },
        },
        quote: {
          price: { currency: 'INR', value: '40' },
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    },
  };
}

/**
 * Handle /status — check order status
 */
function handleStatus(requestBody) {
  const incomingCtx = requestBody.context || {};
  const orderId = requestBody.message?.order_id || 'INDI-METRO-UNKNOWN';

  const context = buildContext('on_status', {
    transaction_id: incomingCtx.transaction_id,
    message_id: incomingCtx.message_id,
  });

  return {
    context,
    message: {
      order: {
        id: orderId,
        state: 'CONFIRMED',
        provider: { id: 'CMRL' },
        fulfillment: {
          id: 'CMRL-FULFILL-1',
          type: 'ROUTE',
          state: {
            descriptor: {
              code: 'TICKET_ISSUED',
              name: 'Ticket Issued',
            },
          },
        },
        updated_at: new Date().toISOString(),
      },
    },
  };
}

module.exports = {
  handleSearch,
  handleSelect,
  handleInit,
  handleConfirm,
  handleStatus,
};
