import { Migration } from '@mikro-orm/migrations';

export class Migration20250723163128 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table `business_calendar` (`sys_id` varchar(255) not null, `cal_type` varchar(40) null, `description` varchar(1000) null, `sys_domain` varchar(32) null, `sys_domain_path` varchar(255) null, `is_legacy_schedule` tinyint(1) not null default false, `label` varchar(80) not null, `calendar_name` varchar(80) null, `parent_sys_id` varchar(255) null, `plural_label` varchar(80) null, `time_zone` varchar(40) null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `business_calendar` add index `business_calendar_parent_sys_id_index`(`parent_sys_id`);'
    );

    this.addSql(
      'create table `cmn_schedule` (`sys_id` varchar(255) not null, `document` varchar(40) null, `document_key` varchar(32) null, `name` varchar(80) not null, `read_only` tinyint(1) not null default false, `type` varchar(40) null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );

    this.addSql(
      'create table `gsw_content` (`sys_id` varchar(36) not null, `active` tinyint(1) not null default true, `description` text null, `order` int not null, `parent_sys_id` varchar(36) null, `root_parent_sys_id` varchar(36) null, `skippable` tinyint(1) not null default true, `supports_child_content` tinyint(1) not null default false, `title` text not null, `weight` float not null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `gsw_content` add index `gsw_content_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content` add index `gsw_content_parent_sys_id_index`(`parent_sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content` add index `gsw_content_root_parent_sys_id_index`(`root_parent_sys_id`);'
    );

    this.addSql(
      'create table `gsw_content_parents` (`gsw_content_1_sys_id` varchar(36) not null, `gsw_content_2_sys_id` varchar(36) not null, primary key (`gsw_content_1_sys_id`, `gsw_content_2_sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `gsw_content_parents` add index `gsw_content_parents_gsw_content_1_sys_id_index`(`gsw_content_1_sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content_parents` add index `gsw_content_parents_gsw_content_2_sys_id_index`(`gsw_content_2_sys_id`);'
    );

    this.addSql(
      'create table `gsw_content_implicit_dependent_on` (`gsw_content_1_sys_id` varchar(36) not null, `gsw_content_2_sys_id` varchar(36) not null, primary key (`gsw_content_1_sys_id`, `gsw_content_2_sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `gsw_content_implicit_dependent_on` add index `gsw_content_implicit_dependent_on_gsw_content_1_sys_id_index`(`gsw_content_1_sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content_implicit_dependent_on` add index `gsw_content_implicit_dependent_on_gsw_content_2_sys_id_index`(`gsw_content_2_sys_id`);'
    );

    this.addSql(
      'create table `gsw_content_dependent_on_contents` (`gsw_content_1_sys_id` varchar(36) not null, `gsw_content_2_sys_id` varchar(36) not null, primary key (`gsw_content_1_sys_id`, `gsw_content_2_sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_contents` add index `gsw_content_dependent_on_contents_gsw_content_1_sys_id_index`(`gsw_content_1_sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_contents` add index `gsw_content_dependent_on_contents_gsw_content_2_sys_id_index`(`gsw_content_2_sys_id`);'
    );

    this.addSql(
      'create table `ldap_server_config` (`sys_id` varchar(255) not null, `name` varchar(40) not null, `active` tinyint(1) not null default true, `authenticate` tinyint(1) not null default true, `listener` tinyint(1) not null default false, `paging` tinyint(1) not null default true, `ssl` tinyint(1) not null default false, `connect_timeout` int null, `listen_interval` int null, `read_timeout` int null, `attributes` varchar(800) null, `dn_field` varchar(80) null, `dn` varchar(100) null, `password` varchar(255) null, `map` varchar(32) null, `mid_server` varchar(32) null, `server_url` varchar(1000) null, `rdn` varchar(100) null, `system_id` varchar(100) null, `vendor` varchar(40) null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );

    this.addSql(
      "create table `rate_type` (`sys_id` varchar(255) not null, `active` tinyint(1) not null default true, `description` varchar(800) null, `sys_domain` varchar(32) not null default 'global', `name` varchar(40) not null, `sys_overrides_sys_id` varchar(255) null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      'alter table `rate_type` add index `rate_type_sys_overrides_sys_id_index`(`sys_overrides_sys_id`);'
    );

    this.addSql(
      'create table `sys_rollback_context` (`sys_id` varchar(36) not null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );

    this.addSql(
      "create table `sn_hr_integrations_source` (`sys_id` varchar(255) not null, `name` varchar(100) not null, `active` tinyint(1) not null default true, `endpoint_url` varchar(100) null, `username_inbound` varchar(40) null, `user_password_inbound` varchar(255) null, `username_outbound` varchar(40) null, `user_password_outbound` varchar(255) null, `rest` tinyint(1) not null default false, `soap` tinyint(1) not null default true, `use_session_token` tinyint(1) not null default false, `version` varchar(40) null, `sys_domain` varchar(32) null, `basic_auth_profile_list` varchar(1024) null, `oauth_entity_profile_list` varchar(1024) null, `outbound_push_retry_cnt` varchar(40) not null default '3', `sys_created_on` datetime null, `sys_updated_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;"
    );

    this.addSql(
      'create table `sys_subscription` (`sys_id` varchar(36) not null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );

    this.addSql(
      'create table `sys_subscription_entitlement` (`sys_id` varchar(36) not null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );

    this.addSql(
      'create table `sys_choice` (`sys_id` varchar(36) not null, `element` varchar(100) not null, `name` varchar(100) not null, `label` varchar(100) not null, `value` varchar(40) not null, `sequence` int not null default 0, `language` varchar(40) not null, `active` tinyint(1) not null default true, `sys_created_on` date not null, `sys_created_by` varchar(40) null, `sys_updated_on` date not null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_choice` add index `sys_choice_element_name_language_index`(`element`, `name`, `language`);'
    );

    this.addSql(
      'create table `sys_glide_object` (`sys_id` varchar(36) not null, `collection` tinyint(1) not null default false, `attributes` varchar(255) null, `class_name` varchar(80) null, `scalar_type` varchar(40) null, `label` varchar(40) null, `scalar_length` varchar(40) null, `name` varchar(40) not null, `use_original_value` tinyint(1) not null default true, `visible` tinyint(1) not null default false, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) not null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_glide_object` add index `sys_glide_object_sys_id_index`(`sys_id`);'
    );

    this.addSql(
      "create table `sys_package` (`sys_id` varchar(36) not null, `collection` tinyint(1) not null default false, `active` tinyint(1) not null default true, `sys_class_name` varchar(255) not null default 'sys_package', `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `source` varchar(255) null, `ide_created` tinyint(1) not null default false, `licensable` tinyint(1) not null default false, `name` varchar(100) not null, `package_json` varchar(255) null, `license_category` varchar(40) null, `license_model` varchar(40) null, `enforce_license` varchar(40) null, `trackable` tinyint(1) not null default false, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) not null, `sys_mod_count` int not null default 0, `version` varchar(40) null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      'alter table `sys_package` add index `sys_package_sys_id_index`(`sys_id`);'
    );

    this.addSql(
      'create table `sys_package_dependency_m2m` (`sys_id` varchar(36) not null, `sys_package_sys_id` varchar(36) not null, `dependency_sys_id` varchar(36) not null, `min_version` varchar(40) null, `sys_created_on` datetime not null, `sys_created_by` varchar(40) not null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_package_dependency_m2m` add index `sys_package_dependency_m2m_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_package_dependency_m2m` add index `sys_package_dependency_m2m_sys_package_sys_id_index`(`sys_package_sys_id`);'
    );
    this.addSql(
      'alter table `sys_package_dependency_m2m` add index `sys_package_dependency_m2m_dependency_sys_id_index`(`dependency_sys_id`);'
    );

    this.addSql(
      'create table `sys_package_dependency_item` (`sys_id` varchar(36) not null, `package_dependency_sys_id` varchar(36) not null, `document_id` varchar(32) not null, `table_name` varchar(80) not null, `sys_created_on` datetime not null, `sys_created_by` varchar(40) not null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_package_dependency_item` add index `sys_package_dependency_item_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_package_dependency_item` add index `sys_package_dependency_item_package_dependency_sys_id_index`(`package_dependency_sys_id`);'
    );

    this.addSql(
      'create table `sys_perspective` (`sys_id` varchar(255) not null, `application` varchar(40) null, `applications` varchar(40) null, `name` varchar(40) null, `order` int null, `roles` varchar(40) null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );

    this.addSql(
      'create table `sys_scope` (`sys_id` varchar(36) not null, `scoped_administration` tinyint(1) not null default false, `can_edit_in_studio` tinyint(1) not null default true, `guided_setup_guid_sys_id` varchar(36) null, `js_level` varchar(255) null, `logo` varchar(255) null, `private` tinyint(1) not null default false, `runtime_access_tracking` varchar(255) null, `restrict_table_access` tinyint(1) not null default false, `scope` varchar(255) not null, `short_description` text null, `subscription_entitlement_sys_id` varchar(36) null, `license_sys_id` varchar(36) null, `template` varchar(255) null, `vendor` varchar(255) null, `vendor_prefix` varchar(255) null, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_scope` add index `sys_scope_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_scope` add index `sys_scope_guided_setup_guid_sys_id_index`(`guided_setup_guid_sys_id`);'
    );
    this.addSql(
      'alter table `sys_scope` add unique `sys_scope_scope_unique`(`scope`);'
    );
    this.addSql(
      'alter table `sys_scope` add index `sys_scope_subscription_entitlement_sys_id_index`(`subscription_entitlement_sys_id`);'
    );
    this.addSql(
      'alter table `sys_scope` add index `sys_scope_license_sys_id_index`(`license_sys_id`);'
    );

    this.addSql(
      'create table `sys_metadata` (`sys_id` varchar(36) not null, `sys_scope_sys_id` varchar(36) not null, `sys_class_name` varchar(255) not null, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `sys_name` varchar(255) not null, `sys_package_sys_id` varchar(36) null, `sys_policy` varchar(255) not null, `sys_update_name` varchar(255) not null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) not null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_metadata` add index `sys_metadata_sys_scope_sys_id_index`(`sys_scope_sys_id`);'
    );
    this.addSql(
      'alter table `sys_metadata` add index `sys_metadata_sys_package_sys_id_index`(`sys_package_sys_id`);'
    );

    this.addSql(
      'create table `sys_filter_option_dynamic` (`sys_id` varchar(36) not null, `sys_scope_sys_id` varchar(36) not null, `sys_class_name` varchar(255) not null, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `sys_name` varchar(255) not null, `sys_package_sys_id` varchar(36) null, `sys_policy` varchar(255) not null, `sys_update_name` varchar(255) not null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) not null, `sys_mod_count` int not null default 0, `active` tinyint(1) not null default false, `available_for_default` tinyint(1) not null default false, `available_for_filter` tinyint(1) not null default false, `available_for_ref_qual` tinyint(1) not null default false, `field_type` varchar(32) null, `label` varchar(40) not null, `order` int not null default 0, `script_reference_id` varchar(32) null, `script_reference_table` varchar(80) null, `table` varchar(80) not null, `roles` varchar(255) null, `filter_by_schedule` varchar(32) null, `script` varchar(255) null, `table_containing_filter` varchar(80) null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_filter_option_dynamic` add index `sys_filter_option_dynamic_sys_scope_sys_id_index`(`sys_scope_sys_id`);'
    );
    this.addSql(
      'alter table `sys_filter_option_dynamic` add index `sys_filter_option_dynamic_sys_package_sys_id_index`(`sys_package_sys_id`);'
    );

    this.addSql(
      'create table `sys_security_attribute` (`sys_id` varchar(36) not null, `name` varchar(80) not null, `label` varchar(80) not null, `active` tinyint(1) not null default true, `description` varchar(255) null, `condition` text null, `script` text null, `lookup_table` varchar(80) null, `lookup_table_column` varchar(80) null, `type` varchar(40) not null, `is_dynamic` tinyint(1) not null default true, `is_localized` tinyint(1) not null default false, `is_system` tinyint(1) not null default false, `sys_created_on` date not null, `sys_created_by` varchar(255) null, `sys_updated_on` date not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_security_attribute` add unique `sys_security_attribute_name_unique`(`name`);'
    );

    this.addSql(
      'create table `sys_update_set_source` (`sys_id` varchar(36) not null, `active` tinyint(1) not null default true, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `instance_id` varchar(255) null, `instance_name` varchar(255) null, `name` varchar(255) null, `password` varchar(255) null, `short_description` text null, `url` varchar(255) null, `username` varchar(255) null, `type` varchar(255) null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_update_set_source` add index `sys_update_set_source_sys_id_index`(`sys_id`);'
    );

    this.addSql(
      'create table `time_sheet_policy` (`sys_id` varchar(255) not null, `allow_blank_time_cards` tinyint(1) not null default false, `allow_multiple_rate_types` tinyint(1) not null default false, `allow_recall` tinyint(1) not null default true, `auto_create_on_task_update` tinyint(1) not null default false, `auto_generate_time_cards` tinyint(1) not null default true, `auto_fill_from_time_worked` tinyint(1) not null default false, `is_default` tinyint(1) not null default false, `default_rate_type_sys_id` varchar(255) null, `sys_domain_sys_id` varchar(36) null, `max_hours_per_day` int null, `max_hours_per_week` int null, `name` varchar(40) not null, `non_project_time_approver` varchar(40) null, `sys_overrides_sys_id` varchar(255) null, `project_time_approver` varchar(40) null, `recall_period_allowed` int null, `update_resource_plan` tinyint(1) not null default false, `week_starts_on` int null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `time_sheet_policy` add index `time_sheet_policy_default_rate_type_sys_id_index`(`default_rate_type_sys_id`);'
    );
    this.addSql(
      'alter table `time_sheet_policy` add index `time_sheet_policy_sys_domain_sys_id_index`(`sys_domain_sys_id`);'
    );
    this.addSql(
      'alter table `time_sheet_policy` add index `time_sheet_policy_sys_overrides_sys_id_index`(`sys_overrides_sys_id`);'
    );

    this.addSql(
      'create table `sys_user` (`sys_id` varchar(36) not null, `user_name` varchar(80) not null, `prefix` varchar(50) null, `first_name` varchar(50) null, `middle_name` varchar(50) null, `last_name` varchar(50) null, `email` varchar(100) null, `employee_number` varchar(100) null, `active` tinyint(1) not null default true, `password` varchar(255) null, `password_needs_reset` tinyint(1) not null default false, `correlation_id` varchar(100) null, `country` varchar(3) null, `city` varchar(40) null, `street` varchar(255) null, `state` varchar(40) null, `zip` varchar(40) null, `phone` varchar(20) null, `mobile_phone` varchar(20) null, `home_phone` varchar(20) null, `fax` varchar(20) null, `locked_out` tinyint(1) not null default false, `vip` tinyint(1) not null default false, `web_service_access_only` tinyint(1) not null default false, `building_sys_id` varchar(36) null, `company_sys_id` varchar(36) null, `cost_center_sys_id` varchar(255) null, `department_sys_id` varchar(255) null, `hr_integration_source_sys_id` varchar(255) null, `ldap_server_sys_id` varchar(255) null, `location_sys_id` varchar(255) null, `default_perspective_sys_id` varchar(255) null, `schedule_sys_id` varchar(255) null, `time_sheet_policy_sys_id` varchar(255) null, `sys_domain_sys_id` varchar(36) null, `sys_domain_path` varchar(255) null, `last_login_time` datetime null, `last_login` datetime null, `name` varchar(151) null, `sys_created_on` datetime not null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_user` add unique `sys_user_user_name_unique`(`user_name`);'
    );
    this.addSql(
      'alter table `sys_user` add unique `sys_user_email_unique`(`email`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_building_sys_id_index`(`building_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_company_sys_id_index`(`company_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_cost_center_sys_id_index`(`cost_center_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_department_sys_id_index`(`department_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_hr_integration_source_sys_id_index`(`hr_integration_source_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_ldap_server_sys_id_index`(`ldap_server_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_location_sys_id_index`(`location_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_default_perspective_sys_id_index`(`default_perspective_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_schedule_sys_id_index`(`schedule_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_time_sheet_policy_sys_id_index`(`time_sheet_policy_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user` add index `sys_user_sys_domain_sys_id_index`(`sys_domain_sys_id`);'
    );

    this.addSql(
      'create table `sys_user_role` (`sys_id` varchar(36) not null, `name` varchar(100) not null, `suffix` varchar(100) null, `description` varchar(1000) null, `grantable` tinyint(1) not null default true, `scoped_admin` tinyint(1) not null default false, `can_delegate` tinyint(1) not null default true, `elevated_privilege` tinyint(1) not null default false, `assignable_by` text null, `encryption_context` varchar(32) null, `includes_roles` varchar(255) null, `sys_created_on` date not null, `sys_created_by_sys_id` varchar(36) null, `sys_updated_on` date not null, `sys_updated_by_sys_id` varchar(36) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_user_role` add unique `sys_user_role_name_unique`(`name`);'
    );
    this.addSql(
      'alter table `sys_user_role` add index `sys_user_role_sys_created_by_sys_id_index`(`sys_created_by_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_role` add index `sys_user_role_sys_updated_by_sys_id_index`(`sys_updated_by_sys_id`);'
    );

    this.addSql(
      'create table `sys_security_operation` (`sys_id` varchar(36) not null, `name` varchar(40) not null, `description` varchar(800) null, `order` int not null, `active` tinyint(1) not null default true, `sys_created_on` date not null, `sys_created_by_sys_id` varchar(36) null, `sys_updated_on` date not null, `sys_updated_by_sys_id` varchar(36) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_security_operation` add index `sys_security_operation_sys_created_by_sys_id_index`(`sys_created_by_sys_id`);'
    );
    this.addSql(
      'alter table `sys_security_operation` add index `sys_security_operation_sys_updated_by_sys_id_index`(`sys_updated_by_sys_id`);'
    );

    this.addSql(
      'create table `sys_security_acl` (`sys_id` varchar(36) not null, `name` varchar(255) not null, `active` tinyint(1) not null default true, `admin_overrides` tinyint(1) not null default true, `advanced` tinyint(1) not null default false, `condition` text null, `applies_to` text null, `controlled_by_refs` text null, `decision_type` varchar(40) not null, `description` text null, `local_or_existing` varchar(40) not null, `script` text null, `operation_sys_id` varchar(36) not null, `security_attribute_sys_id` varchar(36) null, `type` varchar(40) not null, `sys_created_on` date not null, `sys_created_by_sys_id` varchar(36) null, `sys_updated_on` date not null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_security_acl` add index `sys_security_acl_operation_sys_id_index`(`operation_sys_id`);'
    );
    this.addSql(
      'alter table `sys_security_acl` add index `sys_security_acl_security_attribute_sys_id_index`(`security_attribute_sys_id`);'
    );
    this.addSql(
      'alter table `sys_security_acl` add index `sys_security_acl_sys_created_by_sys_id_index`(`sys_created_by_sys_id`);'
    );

    this.addSql(
      'create table `sys_security_acl_role` (`sys_id` varchar(36) not null, `acl_sys_id` varchar(36) not null, `role_sys_id` varchar(36) not null, `sys_created_on` date not null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_security_acl_role` add index `sys_security_acl_role_acl_sys_id_index`(`acl_sys_id`);'
    );
    this.addSql(
      'alter table `sys_security_acl_role` add index `sys_security_acl_role_role_sys_id_index`(`role_sys_id`);'
    );

    this.addSql(
      "create table `sys_properties` (`sys_id` varchar(36) not null, `name` varchar(100) not null, `value` varchar(800) null, `description` varchar(512) null, `choices` varchar(512) null, `suffix` varchar(100) null, `type` varchar(40) not null default 'string', `is_private` tinyint(1) not null default false, `ignore_cache` tinyint(1) not null default false, `read_roles` varchar(255) null, `write_roles` varchar(255) null, `sys_created_on` datetime not null, `sys_created_by_sys_id` varchar(36) not null, `sys_updated_on` datetime null, `sys_updated_by_sys_id` varchar(36) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      'alter table `sys_properties` add index `sys_properties_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_properties` add unique `sys_properties_name_unique`(`name`);'
    );
    this.addSql(
      'alter table `sys_properties` add index `sys_properties_sys_created_by_sys_id_index`(`sys_created_by_sys_id`);'
    );
    this.addSql(
      'alter table `sys_properties` add index `sys_properties_sys_updated_by_sys_id_index`(`sys_updated_by_sys_id`);'
    );

    this.addSql(
      'create table `core_company` (`sys_id` varchar(36) not null, `apple_icon` varchar(255) null, `ua_assessed` tinyint(1) not null default false, `assessment_risk_rating_sys_id` varchar(36) null, `banner_image` varchar(255) null, `banner_text` varchar(800) null, `business_owners` varchar(1024) null, `city` varchar(50) null, `country` varchar(255) null, `contract_start_date` date null, `coordinates_retrieved_on` date null, `duns_number` varchar(255) null, `customer` tinyint(1) not null default false, `discount` numeric(15,2) null, `ecovadis_assessment_status` varchar(800) null, `engagement_risk_rating_sys_id` varchar(36) null, `fax_phone` varchar(255) null, `fiscal_year` date null, `sn_vrm_vendor_fourth_party` tinyint(1) not null default false, `hash` varchar(255) null, `industry_sys_id` varchar(36) null, `justification` varchar(800) null, `ua_last_assessment_date` date null, `ua_last_managed_date` date null, `lat_long_error` varchar(1000) null, `latitude` float null, `longitude` float null, `manufacturer` tinyint(1) not null default false, `market_cap` numeric(20,2) null, `name` varchar(80) not null, `canonical` tinyint(1) not null default false, `notes` varchar(800) null, `num_employees` int null, `overridden_on` date null, `overridden_risk_rating_sys_id` varchar(36) null, `override_risk_rating` tinyint(1) not null default false, `parent_sys_id` varchar(36) null, `phone` varchar(255) null, `primary` tinyint(1) not null default false, `profits` numeric(20,2) null, `publicly_traded` tinyint(1) not null default false, `rank_tier` varchar(40) null, `revenue_per_year` numeric(20,2) null, `external_risk_rating_sys_id` varchar(36) null, `risk_rating_sys_id` varchar(36) null, `risk_tier_sys_id` varchar(36) null, `scoring_rule` varchar(100) null, `scoring_rule_ref_sys_id` varchar(36) null, `state` varchar(255) null, `status` varchar(255) null, `stock_price` varchar(255) null, `stock_symbol` varchar(255) null, `street` varchar(255) null, `child_vendor_risk_rating_sys_id` varchar(36) null, `contact_sys_id` varchar(36) null, `vendor_manager_sys_id` varchar(36) null, `sn_vrm_vendor_third_party` tinyint(1) not null default true, `vendor_tier` varchar(255) null, `sn_tprm_annual_spend` numeric(20,2) null, `banner_image_light` varchar(255) null, `sys_created_on` date not null, `sys_created_by` varchar(255) null, `sys_updated_on` date not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_assessment_risk_rating_sys_id_index`(`assessment_risk_rating_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_engagement_risk_rating_sys_id_index`(`engagement_risk_rating_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_industry_sys_id_index`(`industry_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_overridden_risk_rating_sys_id_index`(`overridden_risk_rating_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_parent_sys_id_index`(`parent_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_external_risk_rating_sys_id_index`(`external_risk_rating_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_risk_rating_sys_id_index`(`risk_rating_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_risk_tier_sys_id_index`(`risk_tier_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_scoring_rule_ref_sys_id_index`(`scoring_rule_ref_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_child_vendor_risk_rating_sys_id_index`(`child_vendor_risk_rating_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_contact_sys_id_index`(`contact_sys_id`);'
    );
    this.addSql(
      'alter table `core_company` add index `core_company_vendor_manager_sys_id_index`(`vendor_manager_sys_id`);'
    );

    this.addSql(
      'create table `cmn_cost_center` (`sys_id` varchar(255) not null, `name` varchar(100) not null, `code` varchar(40) null, `account_number` varchar(40) null, `manager_sys_id` varchar(36) null, `location_sys_id` varchar(255) null, `parent_sys_id` varchar(255) null, `sys_domain_sys_id` varchar(36) null, `sys_domain_path` varchar(255) null, `valid_from` datetime null, `valid_to` datetime null, `sys_created_by` varchar(40) null, `sys_created_on` datetime null, `sys_updated_by` varchar(40) null, `sys_updated_on` datetime null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `cmn_cost_center` add index `cmn_cost_center_manager_sys_id_index`(`manager_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_cost_center` add index `cmn_cost_center_location_sys_id_index`(`location_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_cost_center` add index `cmn_cost_center_parent_sys_id_index`(`parent_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_cost_center` add index `cmn_cost_center_sys_domain_sys_id_index`(`sys_domain_sys_id`);'
    );

    this.addSql(
      'create table `sys_user_group` (`sys_id` varchar(36) not null, `name` varchar(80) not null, `active` tinyint(1) not null default true, `average_daily_fte` int null, `cost_center_sys_id` varchar(255) null, `description` varchar(1000) null, `exclude_manager` tinyint(1) not null default false, `email` varchar(100) null, `hourly_rate` numeric(12,2) not null default 0, `include_members` tinyint(1) not null default false, `default_assignee_sys_id` varchar(36) null, `manager_sys_id` varchar(36) null, `parent_sys_id` varchar(36) null, `points` int null, `source` varchar(255) null, `type` varchar(1024) null, `vendors` varchar(1024) null, `sys_created_on` datetime not null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_user_group` add index `sys_user_group_cost_center_sys_id_index`(`cost_center_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_group` add index `sys_user_group_default_assignee_sys_id_index`(`default_assignee_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_group` add index `sys_user_group_manager_sys_id_index`(`manager_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_group` add index `sys_user_group_parent_sys_id_index`(`parent_sys_id`);'
    );

    this.addSql(
      "create table `sys_user_has_role` (`sys_id` varchar(36) not null, `user_sys_id` varchar(36) not null, `role_sys_id` varchar(36) not null, `granted_by_sys_id` varchar(36) null, `included_in_role_sys_id` varchar(36) null, `included_in_role_instance_sys_id` varchar(36) null, `inh_count` int null, `inh_map` varchar(255) null, `inherited` tinyint(1) not null default false, `state` varchar(40) not null default 'active', `sys_created_on` date not null, `sys_created_by` varchar(255) null, `sys_updated_on` date not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      'alter table `sys_user_has_role` add index `sys_user_has_role_user_sys_id_index`(`user_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_has_role` add index `sys_user_has_role_role_sys_id_index`(`role_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_has_role` add index `sys_user_has_role_granted_by_sys_id_index`(`granted_by_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_has_role` add index `sys_user_has_role_included_in_role_sys_id_index`(`included_in_role_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_has_role` add index `sys_user_has_role_included_in_role_instance_sys_id_index`(`included_in_role_instance_sys_id`);'
    );

    this.addSql(
      'create table `sys_user_grmember` (`sys_id` varchar(36) not null, `user_sys_id` varchar(36) not null, `group_sys_id` varchar(36) not null, `points` int not null default 0, `scrum_role` varchar(40) null, `sys_created_on` date not null, `sys_created_by` varchar(255) null, `sys_updated_on` date not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_user_grmember` add index `sys_user_grmember_user_sys_id_index`(`user_sys_id`);'
    );
    this.addSql(
      'alter table `sys_user_grmember` add index `sys_user_grmember_group_sys_id_index`(`group_sys_id`);'
    );

    this.addSql(
      'create table `sys_group_has_role` (`sys_id` varchar(36) not null, `group_sys_id` varchar(36) not null, `role_sys_id` varchar(36) not null, `granted_by_sys_id` varchar(36) null, `inherits` tinyint(1) not null default true, `sys_created_on` date not null, `sys_created_by` varchar(255) null, `sys_updated_on` date not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_group_has_role` add index `sys_group_has_role_group_sys_id_index`(`group_sys_id`);'
    );
    this.addSql(
      'alter table `sys_group_has_role` add index `sys_group_has_role_role_sys_id_index`(`role_sys_id`);'
    );
    this.addSql(
      'alter table `sys_group_has_role` add index `sys_group_has_role_granted_by_sys_id_index`(`granted_by_sys_id`);'
    );

    this.addSql(
      'create table `cmn_location` (`sys_id` varchar(255) not null, `name` varchar(100) not null, `city` varchar(40) null, `company_sys_id` varchar(36) null, `contact_sys_id` varchar(36) null, `coordinates_retrieved_on` datetime null, `correlation_id` varchar(100) null, `country` varchar(40) null, `duplicate` tinyint(1) not null default false, `sn_tmt_core_external_id` varchar(40) null, `fax_phone` varchar(40) null, `full_name` varchar(255) null, `lat_long_error` varchar(1000) null, `latitude` int null, `longitude` int null, `cmn_location_source` varchar(40) null, `cmn_location_type` varchar(40) null, `managed_by_group_sys_id` varchar(36) null, `parent_sys_id` varchar(255) null, `phone` varchar(40) null, `primary` tinyint(1) not null default false, `primary_location_sys_id` varchar(255) null, `source_sys_id` varchar(255) null, `state` varchar(40) null, `stock_room` tinyint(1) not null default false, `street` varchar(255) null, `time_zone` varchar(40) null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `cmn_location` add index `cmn_location_company_sys_id_index`(`company_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_location` add index `cmn_location_contact_sys_id_index`(`contact_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_location` add index `cmn_location_managed_by_group_sys_id_index`(`managed_by_group_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_location` add index `cmn_location_parent_sys_id_index`(`parent_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_location` add index `cmn_location_primary_location_sys_id_index`(`primary_location_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_location` add index `cmn_location_source_sys_id_index`(`source_sys_id`);'
    );

    this.addSql(
      'create table `cmn_department` (`sys_id` varchar(255) not null, `name` varchar(100) not null, `id` varchar(40) null, `code` varchar(40) null, `description` varchar(1000) null, `correlation_id` varchar(100) null, `head_count` int null, `company_sys_id` varchar(36) null, `cost_center_sys_id` varchar(255) null, `dept_head_sys_id` varchar(36) null, `primary_contact_sys_id` varchar(36) null, `parent_sys_id` varchar(255) null, `source_sys_id` varchar(255) null, `sys_created_on` datetime null, `sys_created_by` varchar(40) null, `sys_updated_on` datetime null, `sys_updated_by` varchar(40) null, `sys_mod_count` int null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `cmn_department` add index `cmn_department_company_sys_id_index`(`company_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_department` add index `cmn_department_cost_center_sys_id_index`(`cost_center_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_department` add index `cmn_department_dept_head_sys_id_index`(`dept_head_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_department` add index `cmn_department_primary_contact_sys_id_index`(`primary_contact_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_department` add index `cmn_department_parent_sys_id_index`(`parent_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_department` add index `cmn_department_source_sys_id_index`(`source_sys_id`);'
    );

    this.addSql(
      'create table `cmn_building` (`sys_id` varchar(36) not null, `contact_sys_id` varchar(36) null, `floors` int null, `location_sys_id` varchar(255) null, `name` varchar(100) not null, `notes` varchar(800) null, `sys_created_on` date not null, `sys_created_by` varchar(255) null, `sys_updated_on` date not null, `sys_updated_by_sys_id` varchar(36) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `cmn_building` add index `cmn_building_contact_sys_id_index`(`contact_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_building` add index `cmn_building_location_sys_id_index`(`location_sys_id`);'
    );
    this.addSql(
      'alter table `cmn_building` add index `cmn_building_sys_updated_by_sys_id_index`(`sys_updated_by_sys_id`);'
    );

    this.addSql(
      'create table `sys_batch_install_plan` (`sys_id` varchar(36) not null, `sys_created_on` date not null, `sys_created_by_sys_id` varchar(36) null, `name` varchar(255) not null, `notes` text null, `rollback_context_sys_id` varchar(36) null, `state` varchar(255) not null, `sys_updated_on` date not null, `sys_updated_by_sys_id` varchar(36) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_batch_install_plan` add index `sys_batch_install_plan_sys_created_by_sys_id_index`(`sys_created_by_sys_id`);'
    );
    this.addSql(
      'alter table `sys_batch_install_plan` add unique `sys_batch_install_plan_name_unique`(`name`);'
    );
    this.addSql(
      'alter table `sys_batch_install_plan` add index `sys_batch_install_plan_rollback_context_sys_id_index`(`rollback_context_sys_id`);'
    );
    this.addSql(
      'alter table `sys_batch_install_plan` add index `sys_batch_install_plan_sys_updated_by_sys_id_index`(`sys_updated_by_sys_id`);'
    );

    this.addSql(
      'create table `sys_update_set` (`sys_id` varchar(36) not null, `application_sys_id` varchar(36) null, `base_update_set_sys_id` varchar(36) null, `batch_install_plan_sys_id` varchar(36) null, `completed_by_sys_id` varchar(36) null, `completed_on` datetime null, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `is_default` tinyint(1) not null default false, `description` varchar(255) null, `install_date` datetime null, `installed_from` varchar(255) null, `merged_to_sys_id` varchar(36) null, `name` varchar(255) not null, `origin_sys_id` varchar(255) null, `parent_sys_id` varchar(36) null, `release_date` datetime null, `remote_sys_id_sys_id` varchar(36) null, `state` varchar(255) null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_application_sys_id_index`(`application_sys_id`);'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_base_update_set_sys_id_index`(`base_update_set_sys_id`);'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_batch_install_plan_sys_id_index`(`batch_install_plan_sys_id`);'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_completed_by_sys_id_index`(`completed_by_sys_id`);'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_merged_to_sys_id_index`(`merged_to_sys_id`);'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_parent_sys_id_index`(`parent_sys_id`);'
    );
    this.addSql(
      'alter table `sys_update_set` add index `sys_update_set_remote_sys_id_sys_id_index`(`remote_sys_id_sys_id`);'
    );

    this.addSql(
      'create table `sys_remote_update_set` (`sys_id` varchar(36) not null, `application_sys_id` varchar(36) null, `application_name` varchar(255) null, `application_scope` varchar(255) null, `application_version` varchar(255) null, `sys_class_name` varchar(255) null, `collisions` int not null default 0, `commit_date` datetime null, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `deleted` int not null default 0, `description` varchar(255) null, `inserted` int not null default 0, `name` varchar(255) null, `origin_sys_id` varchar(255) null, `parent_sys_id` varchar(36) null, `release_date` datetime null, `remote_base_update_set_sys_id` varchar(36) null, `remote_parent_id` varchar(255) null, `remote_sys_id` varchar(255) null, `state` varchar(255) null, `summary` int not null default 0, `update_set_sys_id` varchar(36) null, `update_source_sys_id` varchar(36) null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add index `sys_remote_update_set_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add index `sys_remote_update_set_application_sys_id_index`(`application_sys_id`);'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add index `sys_remote_update_set_parent_sys_id_index`(`parent_sys_id`);'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add index `sys_remote_update_set_remote_base_update_set_sys_id_index`(`remote_base_update_set_sys_id`);'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add index `sys_remote_update_set_update_set_sys_id_index`(`update_set_sys_id`);'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add index `sys_remote_update_set_update_source_sys_id_index`(`update_source_sys_id`);'
    );

    this.addSql(
      'create table `sys_plugins` (`sys_id` varchar(36) not null, `batch_install_plan_sys_id` varchar(36) null, `install_date` datetime null, `parent` varchar(255) null, `sys_created_on` datetime not null, `sys_created_by` varchar(255) null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(255) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_plugins` add index `sys_plugins_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_plugins` add index `sys_plugins_batch_install_plan_sys_id_index`(`batch_install_plan_sys_id`);'
    );

    this.addSql(
      'create table `gsw_content_implicit_plugin_dependencies` (`gsw_content_sys_id` varchar(36) not null, `sys_plugin_sys_id` varchar(36) not null, primary key (`gsw_content_sys_id`, `sys_plugin_sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `gsw_content_implicit_plugin_dependencies` add index `gsw_content_implicit_plugin_dependencies_gsw_conten_74a76_index`(`gsw_content_sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content_implicit_plugin_dependencies` add index `gsw_content_implicit_plugin_dependencies_sys_plugin_sys_id_index`(`sys_plugin_sys_id`);'
    );

    this.addSql(
      'create table `gsw_content_dependent_on_plugins_ids` (`gsw_content_sys_id` varchar(36) not null, `sys_plugin_sys_id` varchar(36) not null, primary key (`gsw_content_sys_id`, `sys_plugin_sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_plugins_ids` add index `gsw_content_dependent_on_plugins_ids_gsw_content_sys_id_index`(`gsw_content_sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_plugins_ids` add index `gsw_content_dependent_on_plugins_ids_sys_plugin_sys_id_index`(`sys_plugin_sys_id`);'
    );

    this.addSql(
      'create table `gsw_content_dependent_on_plugins` (`gsw_content_sys_id` varchar(36) not null, `sys_plugin_sys_id` varchar(36) not null, primary key (`gsw_content_sys_id`, `sys_plugin_sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_plugins` add index `gsw_content_dependent_on_plugins_gsw_content_sys_id_index`(`gsw_content_sys_id`);'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_plugins` add index `gsw_content_dependent_on_plugins_sys_plugin_sys_id_index`(`sys_plugin_sys_id`);'
    );

    this.addSql(
      "create table `sys_db_object` (`sys_id` varchar(36) not null, `collection` tinyint(1) not null default false, `name_sys_id` varchar(36) not null, `access` varchar(40) not null default 'public', `ws_access` tinyint(1) not null default true, `client_scripts_access` tinyint(1) not null default false, `configuration_access` tinyint(1) not null default false, `alter_access` tinyint(1) not null default false, `actions_access` tinyint(1) not null default false, `number_ref_sys_id` varchar(36) null, `caller_access` varchar(40) null, `create_access` tinyint(1) not null default false, `delete_access` tinyint(1) not null default false, `read_access` tinyint(1) not null default true, `update_access` tinyint(1) not null default false, `create_access_controls` tinyint(1) not null default false, `super_class_sys_id` varchar(36) null, `is_extendable` tinyint(1) not null default false, `extension_model` varchar(40) null, `filter_extension` varchar(255) null, `label` varchar(80) null, `live_feed_enabled` tinyint(1) not null default false, `provider_class` varchar(100) null, `scriptable_table` tinyint(1) not null default false, `sys_class_code` varchar(40) null, `sys_class_path` varchar(255) null, `user_role_sys_id` varchar(36) null, `sys_created_on` datetime not null, `sys_created_by` varchar(255) not null, `sys_updated_on` datetime not null, `sys_updated_by` varchar(40) null, `sys_mod_count` int not null default 0, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      'alter table `sys_db_object` add index `sys_db_object_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `sys_db_object` add index `sys_db_object_name_sys_id_index`(`name_sys_id`);'
    );
    this.addSql(
      'alter table `sys_db_object` add index `sys_db_object_number_ref_sys_id_index`(`number_ref_sys_id`);'
    );
    this.addSql(
      'alter table `sys_db_object` add index `sys_db_object_super_class_sys_id_index`(`super_class_sys_id`);'
    );
    this.addSql(
      'alter table `sys_db_object` add index `sys_db_object_user_role_sys_id_index`(`user_role_sys_id`);'
    );

    this.addSql(
      'create table `sys_dictionary` (`sys_id` varchar(36) not null, `column_label` varchar(80) not null, `element` varchar(80) not null, `active` tinyint(1) not null default false, `array` tinyint(1) not null default false, `array_denormalized` tinyint(1) not null default false, `attributes` varchar(1000) null, `audit` tinyint(1) not null default false, `virtual` tinyint(1) not null default false, `calculation` varchar(8000) null, `virtual_type` varchar(40) not null, `choice` int not null default 0, `choice_field` varchar(80) null, `choice_table` varchar(80) null, `display` tinyint(1) not null default false, `dynamic_creation` tinyint(1) not null default false, `dynamic_creation_script` varchar(800) null, `dynamic_default_value_sys_id` varchar(36) null, `dynamic_ref_qual_sys_id` varchar(36) null, `element_reference` tinyint(1) not null default false, `foreign_database` varchar(40) null, `formula` varchar(800) null, `function_definition` varchar(800) null, `function_field` tinyint(1) not null default false, `mandatory` tinyint(1) not null default false, `max_length` int null, `next_element` varchar(80) null, `primary` tinyint(1) not null default false, `read_only` tinyint(1) not null default false, `read_roles` varchar(255) null, `reference_sys_id` varchar(36) not null, `reference_cascade_rule` varchar(20) null, `reference_floats` tinyint(1) not null default false, `reference_key` varchar(40) null, `reference_qual` varchar(1000) null, `reference_qual_condition` varchar(1000) null, `reference_type` varchar(10) null, `sizeclass` int not null default 0, `spell_check` tinyint(1) not null default false, `staged` tinyint(1) not null default false, `name` varchar(80) not null, `table_reference` tinyint(1) not null default false, `text_index` tinyint(1) not null default false, `internal_type_sys_id` varchar(36) not null, `unique` tinyint(1) not null default false, `use_dependent_field` tinyint(1) not null default false, `use_dynamic_default` tinyint(1) not null default false, `use_reference_qualifier` varchar(40) null, `widget` varchar(40) null, `write_roles` varchar(255) null, `xml_view` tinyint(1) not null default false, `sys_created_on` datetime not null, `sys_created_by_sys_id` varchar(36) not null, `sys_updated_on` datetime null, `sys_updated_by` varchar(255) not null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `sys_dictionary` add index `sys_dictionary_dynamic_default_value_sys_id_index`(`dynamic_default_value_sys_id`);'
    );
    this.addSql(
      'alter table `sys_dictionary` add index `sys_dictionary_dynamic_ref_qual_sys_id_index`(`dynamic_ref_qual_sys_id`);'
    );
    this.addSql(
      'alter table `sys_dictionary` add index `sys_dictionary_reference_sys_id_index`(`reference_sys_id`);'
    );
    this.addSql(
      'alter table `sys_dictionary` add index `sys_dictionary_internal_type_sys_id_index`(`internal_type_sys_id`);'
    );
    this.addSql(
      'alter table `sys_dictionary` add index `sys_dictionary_sys_created_by_sys_id_index`(`sys_created_by_sys_id`);'
    );

    this.addSql(
      'create table `v_plugin` (`sys_id` varchar(36) not null, `id` varchar(255) not null, `name` text not null, `available_version` varchar(255) null, `block_install` tinyint(1) not null default false, `definition` text null, `description` text null, `entitled` varchar(255) null, `has_demo_data` tinyint(1) not null default false, `help` varchar(255) null, `licensable` tinyint(1) not null default false, `path` varchar(255) null, `indicators` text null, `provider` varchar(255) null, `scope` varchar(255) null, `state` varchar(255) null, `active` varchar(255) null, `license_category` varchar(255) null, `license_model` varchar(255) null, `version` varchar(255) null, `guided_setup_guid_sys_id` varchar(36) null, primary key (`sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `v_plugin` add index `v_plugin_sys_id_index`(`sys_id`);'
    );
    this.addSql(
      'alter table `v_plugin` add index `v_plugin_guided_setup_guid_sys_id_index`(`guided_setup_guid_sys_id`);'
    );

    this.addSql(
      'create table `v_plugin_requires` (`vplugin_1_sys_id` varchar(36) not null, `vplugin_2_sys_id` varchar(36) not null, primary key (`vplugin_1_sys_id`, `vplugin_2_sys_id`)) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql(
      'alter table `v_plugin_requires` add index `v_plugin_requires_vplugin_1_sys_id_index`(`vplugin_1_sys_id`);'
    );
    this.addSql(
      'alter table `v_plugin_requires` add index `v_plugin_requires_vplugin_2_sys_id_index`(`vplugin_2_sys_id`);'
    );

    this.addSql(
      'alter table `business_calendar` add constraint `business_calendar_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `business_calendar` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `gsw_content` add constraint `gsw_content_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `gsw_content` add constraint `gsw_content_root_parent_sys_id_foreign` foreign key (`root_parent_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `gsw_content_parents` add constraint `gsw_content_parents_gsw_content_1_sys_id_foreign` foreign key (`gsw_content_1_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table `gsw_content_parents` add constraint `gsw_content_parents_gsw_content_2_sys_id_foreign` foreign key (`gsw_content_2_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table `gsw_content_implicit_dependent_on` add constraint `gsw_content_implicit_dependent_on_gsw_content_1_sys_id_foreign` foreign key (`gsw_content_1_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table `gsw_content_implicit_dependent_on` add constraint `gsw_content_implicit_dependent_on_gsw_content_2_sys_id_foreign` foreign key (`gsw_content_2_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_contents` add constraint `gsw_content_dependent_on_contents_gsw_content_1_sys_id_foreign` foreign key (`gsw_content_1_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_contents` add constraint `gsw_content_dependent_on_contents_gsw_content_2_sys_id_foreign` foreign key (`gsw_content_2_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table `rate_type` add constraint `rate_type_sys_overrides_sys_id_foreign` foreign key (`sys_overrides_sys_id`) references `rate_type` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_package_dependency_m2m` add constraint `sys_package_dependency_m2m_sys_package_sys_id_foreign` foreign key (`sys_package_sys_id`) references `sys_package` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_package_dependency_m2m` add constraint `sys_package_dependency_m2m_dependency_sys_id_foreign` foreign key (`dependency_sys_id`) references `sys_package` (`sys_id`) on update cascade;'
    );

    this.addSql(
      'alter table `sys_package_dependency_item` add constraint `sys_package_dependency_item_package_dependency_sys_id_foreign` foreign key (`package_dependency_sys_id`) references `sys_package_dependency_m2m` (`sys_id`) on update cascade;'
    );

    this.addSql(
      'alter table `sys_scope` add constraint `sys_scope_guided_setup_guid_sys_id_foreign` foreign key (`guided_setup_guid_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_scope` add constraint `sys_scope_subscription_entitlement_sys_id_foreign` foreign key (`subscription_entitlement_sys_id`) references `sys_subscription_entitlement` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_scope` add constraint `sys_scope_license_sys_id_foreign` foreign key (`license_sys_id`) references `sys_subscription` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_metadata` add constraint `sys_metadata_sys_scope_sys_id_foreign` foreign key (`sys_scope_sys_id`) references `sys_scope` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_metadata` add constraint `sys_metadata_sys_package_sys_id_foreign` foreign key (`sys_package_sys_id`) references `sys_package` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_filter_option_dynamic` add constraint `sys_filter_option_dynamic_sys_scope_sys_id_foreign` foreign key (`sys_scope_sys_id`) references `sys_scope` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_filter_option_dynamic` add constraint `sys_filter_option_dynamic_sys_package_sys_id_foreign` foreign key (`sys_package_sys_id`) references `sys_package` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `time_sheet_policy` add constraint `time_sheet_policy_default_rate_type_sys_id_foreign` foreign key (`default_rate_type_sys_id`) references `rate_type` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `time_sheet_policy` add constraint `time_sheet_policy_sys_domain_sys_id_foreign` foreign key (`sys_domain_sys_id`) references `sys_user_group` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `time_sheet_policy` add constraint `time_sheet_policy_sys_overrides_sys_id_foreign` foreign key (`sys_overrides_sys_id`) references `time_sheet_policy` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_user` add constraint `sys_user_building_sys_id_foreign` foreign key (`building_sys_id`) references `cmn_building` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_company_sys_id_foreign` foreign key (`company_sys_id`) references `core_company` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_cost_center_sys_id_foreign` foreign key (`cost_center_sys_id`) references `cmn_cost_center` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_department_sys_id_foreign` foreign key (`department_sys_id`) references `cmn_department` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_hr_integration_source_sys_id_foreign` foreign key (`hr_integration_source_sys_id`) references `sn_hr_integrations_source` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_ldap_server_sys_id_foreign` foreign key (`ldap_server_sys_id`) references `ldap_server_config` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_location_sys_id_foreign` foreign key (`location_sys_id`) references `cmn_location` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_default_perspective_sys_id_foreign` foreign key (`default_perspective_sys_id`) references `sys_perspective` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_schedule_sys_id_foreign` foreign key (`schedule_sys_id`) references `cmn_schedule` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_time_sheet_policy_sys_id_foreign` foreign key (`time_sheet_policy_sys_id`) references `time_sheet_policy` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user` add constraint `sys_user_sys_domain_sys_id_foreign` foreign key (`sys_domain_sys_id`) references `sys_user_group` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_user_role` add constraint `sys_user_role_sys_created_by_sys_id_foreign` foreign key (`sys_created_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user_role` add constraint `sys_user_role_sys_updated_by_sys_id_foreign` foreign key (`sys_updated_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_security_operation` add constraint `sys_security_operation_sys_created_by_sys_id_foreign` foreign key (`sys_created_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_security_operation` add constraint `sys_security_operation_sys_updated_by_sys_id_foreign` foreign key (`sys_updated_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_security_acl` add constraint `sys_security_acl_operation_sys_id_foreign` foreign key (`operation_sys_id`) references `sys_security_operation` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_security_acl` add constraint `sys_security_acl_security_attribute_sys_id_foreign` foreign key (`security_attribute_sys_id`) references `sys_security_attribute` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_security_acl` add constraint `sys_security_acl_sys_created_by_sys_id_foreign` foreign key (`sys_created_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_security_acl_role` add constraint `sys_security_acl_role_acl_sys_id_foreign` foreign key (`acl_sys_id`) references `sys_security_acl` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_security_acl_role` add constraint `sys_security_acl_role_role_sys_id_foreign` foreign key (`role_sys_id`) references `sys_user_role` (`sys_id`) on update cascade;'
    );

    this.addSql(
      'alter table `sys_properties` add constraint `sys_properties_sys_created_by_sys_id_foreign` foreign key (`sys_created_by_sys_id`) references `sys_user` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_properties` add constraint `sys_properties_sys_updated_by_sys_id_foreign` foreign key (`sys_updated_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `core_company` add constraint `core_company_assessment_risk_rating_sys_id_foreign` foreign key (`assessment_risk_rating_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_engagement_risk_rating_sys_id_foreign` foreign key (`engagement_risk_rating_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_industry_sys_id_foreign` foreign key (`industry_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_overridden_risk_rating_sys_id_foreign` foreign key (`overridden_risk_rating_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `core_company` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_external_risk_rating_sys_id_foreign` foreign key (`external_risk_rating_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_risk_rating_sys_id_foreign` foreign key (`risk_rating_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_risk_tier_sys_id_foreign` foreign key (`risk_tier_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_scoring_rule_ref_sys_id_foreign` foreign key (`scoring_rule_ref_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_child_vendor_risk_rating_sys_id_foreign` foreign key (`child_vendor_risk_rating_sys_id`) references `sys_choice` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_contact_sys_id_foreign` foreign key (`contact_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `core_company` add constraint `core_company_vendor_manager_sys_id_foreign` foreign key (`vendor_manager_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `cmn_cost_center` add constraint `cmn_cost_center_manager_sys_id_foreign` foreign key (`manager_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_cost_center` add constraint `cmn_cost_center_location_sys_id_foreign` foreign key (`location_sys_id`) references `cmn_location` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_cost_center` add constraint `cmn_cost_center_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `cmn_cost_center` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_cost_center` add constraint `cmn_cost_center_sys_domain_sys_id_foreign` foreign key (`sys_domain_sys_id`) references `sys_user_group` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_user_group` add constraint `sys_user_group_cost_center_sys_id_foreign` foreign key (`cost_center_sys_id`) references `cmn_cost_center` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user_group` add constraint `sys_user_group_default_assignee_sys_id_foreign` foreign key (`default_assignee_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user_group` add constraint `sys_user_group_manager_sys_id_foreign` foreign key (`manager_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user_group` add constraint `sys_user_group_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `sys_user_group` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_user_has_role` add constraint `sys_user_has_role_user_sys_id_foreign` foreign key (`user_sys_id`) references `sys_user` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_user_has_role` add constraint `sys_user_has_role_role_sys_id_foreign` foreign key (`role_sys_id`) references `sys_user_role` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_user_has_role` add constraint `sys_user_has_role_granted_by_sys_id_foreign` foreign key (`granted_by_sys_id`) references `sys_user_group` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user_has_role` add constraint `sys_user_has_role_included_in_role_sys_id_foreign` foreign key (`included_in_role_sys_id`) references `sys_user_role` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_user_has_role` add constraint `sys_user_has_role_included_in_role_instance_sys_id_foreign` foreign key (`included_in_role_instance_sys_id`) references `sys_user_role` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_user_grmember` add constraint `sys_user_grmember_user_sys_id_foreign` foreign key (`user_sys_id`) references `sys_user` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_user_grmember` add constraint `sys_user_grmember_group_sys_id_foreign` foreign key (`group_sys_id`) references `sys_user_group` (`sys_id`) on update cascade;'
    );

    this.addSql(
      'alter table `sys_group_has_role` add constraint `sys_group_has_role_group_sys_id_foreign` foreign key (`group_sys_id`) references `sys_user_group` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_group_has_role` add constraint `sys_group_has_role_role_sys_id_foreign` foreign key (`role_sys_id`) references `sys_user_role` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_group_has_role` add constraint `sys_group_has_role_granted_by_sys_id_foreign` foreign key (`granted_by_sys_id`) references `sys_user_group` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `cmn_location` add constraint `cmn_location_company_sys_id_foreign` foreign key (`company_sys_id`) references `core_company` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_location` add constraint `cmn_location_contact_sys_id_foreign` foreign key (`contact_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_location` add constraint `cmn_location_managed_by_group_sys_id_foreign` foreign key (`managed_by_group_sys_id`) references `sys_user_group` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_location` add constraint `cmn_location_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `cmn_location` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_location` add constraint `cmn_location_primary_location_sys_id_foreign` foreign key (`primary_location_sys_id`) references `cmn_location` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_location` add constraint `cmn_location_source_sys_id_foreign` foreign key (`source_sys_id`) references `sn_hr_integrations_source` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `cmn_department` add constraint `cmn_department_company_sys_id_foreign` foreign key (`company_sys_id`) references `core_company` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_department` add constraint `cmn_department_cost_center_sys_id_foreign` foreign key (`cost_center_sys_id`) references `cmn_cost_center` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_department` add constraint `cmn_department_dept_head_sys_id_foreign` foreign key (`dept_head_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_department` add constraint `cmn_department_primary_contact_sys_id_foreign` foreign key (`primary_contact_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_department` add constraint `cmn_department_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `cmn_department` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_department` add constraint `cmn_department_source_sys_id_foreign` foreign key (`source_sys_id`) references `sn_hr_integrations_source` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `cmn_building` add constraint `cmn_building_contact_sys_id_foreign` foreign key (`contact_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_building` add constraint `cmn_building_location_sys_id_foreign` foreign key (`location_sys_id`) references `cmn_location` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `cmn_building` add constraint `cmn_building_sys_updated_by_sys_id_foreign` foreign key (`sys_updated_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_batch_install_plan` add constraint `sys_batch_install_plan_sys_created_by_sys_id_foreign` foreign key (`sys_created_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_batch_install_plan` add constraint `sys_batch_install_plan_rollback_context_sys_id_foreign` foreign key (`rollback_context_sys_id`) references `sys_rollback_context` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_batch_install_plan` add constraint `sys_batch_install_plan_sys_updated_by_sys_id_foreign` foreign key (`sys_updated_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_update_set` add constraint `sys_update_set_application_sys_id_foreign` foreign key (`application_sys_id`) references `sys_package` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_update_set` add constraint `sys_update_set_base_update_set_sys_id_foreign` foreign key (`base_update_set_sys_id`) references `sys_update_set` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_update_set` add constraint `sys_update_set_batch_install_plan_sys_id_foreign` foreign key (`batch_install_plan_sys_id`) references `sys_batch_install_plan` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_update_set` add constraint `sys_update_set_completed_by_sys_id_foreign` foreign key (`completed_by_sys_id`) references `sys_user` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_update_set` add constraint `sys_update_set_merged_to_sys_id_foreign` foreign key (`merged_to_sys_id`) references `sys_update_set` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_update_set` add constraint `sys_update_set_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `sys_update_set` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_update_set` add constraint `sys_update_set_remote_sys_id_sys_id_foreign` foreign key (`remote_sys_id_sys_id`) references `sys_remote_update_set` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_remote_update_set` add constraint `sys_remote_update_set_application_sys_id_foreign` foreign key (`application_sys_id`) references `sys_package` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add constraint `sys_remote_update_set_parent_sys_id_foreign` foreign key (`parent_sys_id`) references `sys_remote_update_set` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add constraint `sys_remote_update_set_remote_base_update_set_sys_id_foreign` foreign key (`remote_base_update_set_sys_id`) references `sys_remote_update_set` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add constraint `sys_remote_update_set_update_set_sys_id_foreign` foreign key (`update_set_sys_id`) references `sys_update_set` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_remote_update_set` add constraint `sys_remote_update_set_update_source_sys_id_foreign` foreign key (`update_source_sys_id`) references `sys_update_set_source` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_plugins` add constraint `sys_plugins_batch_install_plan_sys_id_foreign` foreign key (`batch_install_plan_sys_id`) references `sys_batch_install_plan` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `gsw_content_implicit_plugin_dependencies` add constraint `gsw_content_implicit_plugin_dependencies_gsw_cont_cb29c_foreign` foreign key (`gsw_content_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table `gsw_content_implicit_plugin_dependencies` add constraint `gsw_content_implicit_plugin_dependencies_sys_plug_044e1_foreign` foreign key (`sys_plugin_sys_id`) references `sys_plugins` (`sys_id`) on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_plugins_ids` add constraint `gsw_content_dependent_on_plugins_ids_gsw_content_sys_id_foreign` foreign key (`gsw_content_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_plugins_ids` add constraint `gsw_content_dependent_on_plugins_ids_sys_plugin_sys_id_foreign` foreign key (`sys_plugin_sys_id`) references `sys_plugins` (`sys_id`) on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_plugins` add constraint `gsw_content_dependent_on_plugins_gsw_content_sys_id_foreign` foreign key (`gsw_content_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table `gsw_content_dependent_on_plugins` add constraint `gsw_content_dependent_on_plugins_sys_plugin_sys_id_foreign` foreign key (`sys_plugin_sys_id`) references `sys_plugins` (`sys_id`) on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table `sys_db_object` add constraint `sys_db_object_name_sys_id_foreign` foreign key (`name_sys_id`) references `sys_glide_object` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_db_object` add constraint `sys_db_object_number_ref_sys_id_foreign` foreign key (`number_ref_sys_id`) references `sys_batch_install_plan` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_db_object` add constraint `sys_db_object_super_class_sys_id_foreign` foreign key (`super_class_sys_id`) references `sys_db_object` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_db_object` add constraint `sys_db_object_user_role_sys_id_foreign` foreign key (`user_role_sys_id`) references `sys_user_role` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `sys_dictionary` add constraint `sys_dictionary_dynamic_default_value_sys_id_foreign` foreign key (`dynamic_default_value_sys_id`) references `sys_filter_option_dynamic` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_dictionary` add constraint `sys_dictionary_dynamic_ref_qual_sys_id_foreign` foreign key (`dynamic_ref_qual_sys_id`) references `sys_filter_option_dynamic` (`sys_id`) on update cascade on delete set null;'
    );
    this.addSql(
      'alter table `sys_dictionary` add constraint `sys_dictionary_reference_sys_id_foreign` foreign key (`reference_sys_id`) references `sys_db_object` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_dictionary` add constraint `sys_dictionary_internal_type_sys_id_foreign` foreign key (`internal_type_sys_id`) references `sys_glide_object` (`sys_id`) on update cascade;'
    );
    this.addSql(
      'alter table `sys_dictionary` add constraint `sys_dictionary_sys_created_by_sys_id_foreign` foreign key (`sys_created_by_sys_id`) references `sys_user` (`sys_id`) on update cascade;'
    );

    this.addSql(
      'alter table `v_plugin` add constraint `v_plugin_guided_setup_guid_sys_id_foreign` foreign key (`guided_setup_guid_sys_id`) references `gsw_content` (`sys_id`) on update cascade on delete set null;'
    );

    this.addSql(
      'alter table `v_plugin_requires` add constraint `v_plugin_requires_vplugin_1_sys_id_foreign` foreign key (`vplugin_1_sys_id`) references `v_plugin` (`sys_id`) on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table `v_plugin_requires` add constraint `v_plugin_requires_vplugin_2_sys_id_foreign` foreign key (`vplugin_2_sys_id`) references `v_plugin` (`sys_id`) on update cascade on delete cascade;'
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      'alter table `business_calendar` drop foreign key `business_calendar_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_schedule_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content` drop foreign key `gsw_content_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content` drop foreign key `gsw_content_root_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_parents` drop foreign key `gsw_content_parents_gsw_content_1_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_parents` drop foreign key `gsw_content_parents_gsw_content_2_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_implicit_dependent_on` drop foreign key `gsw_content_implicit_dependent_on_gsw_content_1_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_implicit_dependent_on` drop foreign key `gsw_content_implicit_dependent_on_gsw_content_2_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_contents` drop foreign key `gsw_content_dependent_on_contents_gsw_content_1_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_contents` drop foreign key `gsw_content_dependent_on_contents_gsw_content_2_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_scope` drop foreign key `sys_scope_guided_setup_guid_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_implicit_plugin_dependencies` drop foreign key `gsw_content_implicit_plugin_dependencies_gsw_cont_cb29c_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_plugins_ids` drop foreign key `gsw_content_dependent_on_plugins_ids_gsw_content_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_plugins` drop foreign key `gsw_content_dependent_on_plugins_gsw_content_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `v_plugin` drop foreign key `v_plugin_guided_setup_guid_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_ldap_server_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `rate_type` drop foreign key `rate_type_sys_overrides_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `time_sheet_policy` drop foreign key `time_sheet_policy_default_rate_type_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_batch_install_plan` drop foreign key `sys_batch_install_plan_rollback_context_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_hr_integration_source_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_location` drop foreign key `cmn_location_source_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_department` drop foreign key `cmn_department_source_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_scope` drop foreign key `sys_scope_license_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_scope` drop foreign key `sys_scope_subscription_entitlement_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_assessment_risk_rating_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_engagement_risk_rating_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_industry_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_overridden_risk_rating_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_external_risk_rating_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_risk_rating_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_risk_tier_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_scoring_rule_ref_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_child_vendor_risk_rating_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_db_object` drop foreign key `sys_db_object_name_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_dictionary` drop foreign key `sys_dictionary_internal_type_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_package_dependency_m2m` drop foreign key `sys_package_dependency_m2m_sys_package_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_package_dependency_m2m` drop foreign key `sys_package_dependency_m2m_dependency_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_metadata` drop foreign key `sys_metadata_sys_package_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_filter_option_dynamic` drop foreign key `sys_filter_option_dynamic_sys_package_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_update_set` drop foreign key `sys_update_set_application_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_remote_update_set` drop foreign key `sys_remote_update_set_application_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_package_dependency_item` drop foreign key `sys_package_dependency_item_package_dependency_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_default_perspective_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_metadata` drop foreign key `sys_metadata_sys_scope_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_filter_option_dynamic` drop foreign key `sys_filter_option_dynamic_sys_scope_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_dictionary` drop foreign key `sys_dictionary_dynamic_default_value_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_dictionary` drop foreign key `sys_dictionary_dynamic_ref_qual_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_security_acl` drop foreign key `sys_security_acl_security_attribute_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_remote_update_set` drop foreign key `sys_remote_update_set_update_source_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `time_sheet_policy` drop foreign key `time_sheet_policy_sys_overrides_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_time_sheet_policy_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_role` drop foreign key `sys_user_role_sys_created_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_role` drop foreign key `sys_user_role_sys_updated_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_security_operation` drop foreign key `sys_security_operation_sys_created_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_security_operation` drop foreign key `sys_security_operation_sys_updated_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_security_acl` drop foreign key `sys_security_acl_sys_created_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_properties` drop foreign key `sys_properties_sys_created_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_properties` drop foreign key `sys_properties_sys_updated_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_contact_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_vendor_manager_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_cost_center` drop foreign key `cmn_cost_center_manager_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_group` drop foreign key `sys_user_group_default_assignee_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_group` drop foreign key `sys_user_group_manager_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_has_role` drop foreign key `sys_user_has_role_user_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_grmember` drop foreign key `sys_user_grmember_user_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_location` drop foreign key `cmn_location_contact_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_department` drop foreign key `cmn_department_dept_head_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_department` drop foreign key `cmn_department_primary_contact_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_building` drop foreign key `cmn_building_contact_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_building` drop foreign key `cmn_building_sys_updated_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_batch_install_plan` drop foreign key `sys_batch_install_plan_sys_created_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_batch_install_plan` drop foreign key `sys_batch_install_plan_sys_updated_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_update_set` drop foreign key `sys_update_set_completed_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_dictionary` drop foreign key `sys_dictionary_sys_created_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_security_acl_role` drop foreign key `sys_security_acl_role_role_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_has_role` drop foreign key `sys_user_has_role_role_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_has_role` drop foreign key `sys_user_has_role_included_in_role_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_has_role` drop foreign key `sys_user_has_role_included_in_role_instance_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_group_has_role` drop foreign key `sys_group_has_role_role_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_db_object` drop foreign key `sys_db_object_user_role_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_security_acl` drop foreign key `sys_security_acl_operation_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_security_acl_role` drop foreign key `sys_security_acl_role_acl_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_company_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `core_company` drop foreign key `core_company_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_location` drop foreign key `cmn_location_company_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_department` drop foreign key `cmn_department_company_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_cost_center_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_cost_center` drop foreign key `cmn_cost_center_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_group` drop foreign key `sys_user_group_cost_center_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_department` drop foreign key `cmn_department_cost_center_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `time_sheet_policy` drop foreign key `time_sheet_policy_sys_domain_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_sys_domain_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_cost_center` drop foreign key `cmn_cost_center_sys_domain_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_group` drop foreign key `sys_user_group_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_has_role` drop foreign key `sys_user_has_role_granted_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user_grmember` drop foreign key `sys_user_grmember_group_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_group_has_role` drop foreign key `sys_group_has_role_group_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_group_has_role` drop foreign key `sys_group_has_role_granted_by_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_location` drop foreign key `cmn_location_managed_by_group_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_location_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_cost_center` drop foreign key `cmn_cost_center_location_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_location` drop foreign key `cmn_location_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_location` drop foreign key `cmn_location_primary_location_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_building` drop foreign key `cmn_building_location_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_department_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `cmn_department` drop foreign key `cmn_department_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_user` drop foreign key `sys_user_building_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_update_set` drop foreign key `sys_update_set_batch_install_plan_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_plugins` drop foreign key `sys_plugins_batch_install_plan_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_db_object` drop foreign key `sys_db_object_number_ref_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_update_set` drop foreign key `sys_update_set_base_update_set_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_update_set` drop foreign key `sys_update_set_merged_to_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_update_set` drop foreign key `sys_update_set_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_remote_update_set` drop foreign key `sys_remote_update_set_update_set_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_update_set` drop foreign key `sys_update_set_remote_sys_id_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_remote_update_set` drop foreign key `sys_remote_update_set_parent_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_remote_update_set` drop foreign key `sys_remote_update_set_remote_base_update_set_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_implicit_plugin_dependencies` drop foreign key `gsw_content_implicit_plugin_dependencies_sys_plug_044e1_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_plugins_ids` drop foreign key `gsw_content_dependent_on_plugins_ids_sys_plugin_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `gsw_content_dependent_on_plugins` drop foreign key `gsw_content_dependent_on_plugins_sys_plugin_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_db_object` drop foreign key `sys_db_object_super_class_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `sys_dictionary` drop foreign key `sys_dictionary_reference_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `v_plugin_requires` drop foreign key `v_plugin_requires_vplugin_1_sys_id_foreign`;'
    );

    this.addSql(
      'alter table `v_plugin_requires` drop foreign key `v_plugin_requires_vplugin_2_sys_id_foreign`;'
    );

    this.addSql('drop table if exists `business_calendar`;');

    this.addSql('drop table if exists `cmn_schedule`;');

    this.addSql('drop table if exists `gsw_content`;');

    this.addSql('drop table if exists `gsw_content_parents`;');

    this.addSql('drop table if exists `gsw_content_implicit_dependent_on`;');

    this.addSql('drop table if exists `gsw_content_dependent_on_contents`;');

    this.addSql('drop table if exists `ldap_server_config`;');

    this.addSql('drop table if exists `rate_type`;');

    this.addSql('drop table if exists `sys_rollback_context`;');

    this.addSql('drop table if exists `sn_hr_integrations_source`;');

    this.addSql('drop table if exists `sys_subscription`;');

    this.addSql('drop table if exists `sys_subscription_entitlement`;');

    this.addSql('drop table if exists `sys_choice`;');

    this.addSql('drop table if exists `sys_glide_object`;');

    this.addSql('drop table if exists `sys_package`;');

    this.addSql('drop table if exists `sys_package_dependency_m2m`;');

    this.addSql('drop table if exists `sys_package_dependency_item`;');

    this.addSql('drop table if exists `sys_perspective`;');

    this.addSql('drop table if exists `sys_scope`;');

    this.addSql('drop table if exists `sys_metadata`;');

    this.addSql('drop table if exists `sys_filter_option_dynamic`;');

    this.addSql('drop table if exists `sys_security_attribute`;');

    this.addSql('drop table if exists `sys_update_set_source`;');

    this.addSql('drop table if exists `time_sheet_policy`;');

    this.addSql('drop table if exists `sys_user`;');

    this.addSql('drop table if exists `sys_user_role`;');

    this.addSql('drop table if exists `sys_security_operation`;');

    this.addSql('drop table if exists `sys_security_acl`;');

    this.addSql('drop table if exists `sys_security_acl_role`;');

    this.addSql('drop table if exists `sys_properties`;');

    this.addSql('drop table if exists `core_company`;');

    this.addSql('drop table if exists `cmn_cost_center`;');

    this.addSql('drop table if exists `sys_user_group`;');

    this.addSql('drop table if exists `sys_user_has_role`;');

    this.addSql('drop table if exists `sys_user_grmember`;');

    this.addSql('drop table if exists `sys_group_has_role`;');

    this.addSql('drop table if exists `cmn_location`;');

    this.addSql('drop table if exists `cmn_department`;');

    this.addSql('drop table if exists `cmn_building`;');

    this.addSql('drop table if exists `sys_batch_install_plan`;');

    this.addSql('drop table if exists `sys_update_set`;');

    this.addSql('drop table if exists `sys_remote_update_set`;');

    this.addSql('drop table if exists `sys_plugins`;');

    this.addSql(
      'drop table if exists `gsw_content_implicit_plugin_dependencies`;'
    );

    this.addSql('drop table if exists `gsw_content_dependent_on_plugins_ids`;');

    this.addSql('drop table if exists `gsw_content_dependent_on_plugins`;');

    this.addSql('drop table if exists `sys_db_object`;');

    this.addSql('drop table if exists `sys_dictionary`;');

    this.addSql('drop table if exists `v_plugin`;');

    this.addSql('drop table if exists `v_plugin_requires`;');
  }
}
