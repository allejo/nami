import * as _ from 'lodash';
import WhereQueryBuilder from "./where-query-builder";

export default class SoqlBuilder {
    constructor() {
        this.query = {
            select: [],
            selectAlias: [],
            where: new WhereQueryBuilder(),
            group: [],
            having: new WhereQueryBuilder(),
            order: [],
            offset: null,
            limit: null
        };
    }

    getQuery() {
        let selects = this.query.select;

        _.each(this.query.selectAlias, function (value) {
            selects.push(`${value.column} AS ${value.alias}`);
        });

        return {
            '$select': selects.join(','),
            '$where': this.query.where.toString(),
            '$order': this.query.order.join(','),
            '$group': this.query.group.join(','),
            '$having': this.query.having.toString(),
            '$limit': this.query.limit,
            '$offset': this.query.offset,
        };
    }

    select(column: Array<string>|string|Object) {
        if (_.isArray(column)) {
            this.query.select.push(...column);
        }
        else if (_.isString(column)) {
            this.query.select.push(column);
        }
        else if (_.isObject(column)) {
            _.each(column, function (value, key) {
                this.query.selectAlias.push({
                    column: value,
                    alias: key
                });
            }.bind(this));
        }
    }

    where(condition: string|WhereQueryBuilder) {
        this.query.where.where(condition);
    }

    andWhere(condition: string|WhereQueryBuilder) {
        this.query.where.andWhere(condition);
    }

    orWhere(condition: string|WhereQueryBuilder) {
        this.query.where.orWhere(condition);
    }

    having(condition: string|WhereQueryBuilder) {
        this.query.having.where(condition);
    }

    andHaving(condition: string|WhereQueryBuilder) {
        this.query.having.andWhere(condition);
    }

    orHaving(conditions: string|WhereQueryBuilder) {
        this.query.having.orWhere(conditions);
    }

    orderBy(column: Array<string>|string) {
        if (_.isArray(column)) {
            this.query.order.push(...column);
        }
        else if (_.isString(column)) {
            this.query.order.push(column);
        }
    }

    groupBy(column: Array<string>|string) {
        if (_.isArray(column)) {
            this.query.group.push(...column);
        }
        else if (_.isString(column)) {
            this.query.group.push(column);
        }
    }

    limit(limit: number) {
        this.query.limit = Math.max(1, Math.round(limit));
    }

    offset(offset: number) {
        this.query.offset = Math.max(0, Math.round(offset))
    }
}
