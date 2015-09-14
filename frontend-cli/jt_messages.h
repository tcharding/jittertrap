#ifndef JT_MESSAGES_H
#define JT_MESSAGES_H

#include "jt_message_types.h"
#include "jt_msg_stats.h"
#include "jt_msg_list_ifaces.h"
#include "jt_msg_select_iface.h"

static const struct jt_msg_type jt_messages[] =
    {[JT_MSG_STATS_V1] = {
	     .type = JT_MSG_STATS_V1,
	     .key = "stats",
	     .unpack = jt_stats_unpacker,
	     .consume = jt_stats_consumer,
     },
     [JT_MSG_IFACE_LIST_V1] = { .type = JT_MSG_IFACE_LIST_V1,
		                .key = "ifaces",
		                .unpack = jt_iface_list_unpacker,
		                .consume = jt_iface_list_consumer },
     [JT_MSG_SELECT_IFACE_V1] = { .type = JT_MSG_SELECT_IFACE_V1,
                                  .key = "dev_select",
                                  .unpack = jt_select_iface_unpacker,
                                  .consume = jt_select_iface_consumer },
     [JT_MSG_END] = {
	     .type = JT_MSG_END, .key = NULL, .unpack = NULL, .consume = NULL
     } };

/* try to parse message and consume data if possible */
int jt_msg_handler(char *input);

#endif