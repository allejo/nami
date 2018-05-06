import forEach from 'lodash.foreach';
import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';
import WhereQueryBuilder from './where-query-builder';

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

        forEach(this.query.selectAlias, function(value) {
            selects.push(`${value.column} AS ${value.alias}`);
        });

        return {
            $select: selects.join(','),
            $where: this.query.where.toString(),
            $order: this.query.order.join(','),
            $group: this.query.group.join(','),
            $having: this.query.having.toString(),
            $limit: this.query.limit,
            $offset: this.query.offset
        };
    }

    select(column: Array<string> | string | Object) {
        if (Array.isArray(column)) {
            this.query.select.push(...column);
        } else if (isString(column)) {
            this.query.select.push(column);
        } else if (isObject(column)) {
            forEach(
                column,
                function(value, key) {
                    this.query.selectAlias.push({
                        column: value,
                        alias: key
                    });
                }.bind(this)
            );
        }

        return this;
    }

    where(condition: string | WhereQueryBuilder) {
        this.query.where.where(condition);

        return this;
    }

    andWhere(condition: string | WhereQueryBuilder) {
        this.query.where.andWhere(condition);

        return this;
    }

    orWhere(condition: string | WhereQueryBuilder) {
        this.query.where.orWhere(condition);

        return this;
    }

    having(condition: string | WhereQueryBuilder) {
        this.query.having.where(condition);

        return this;
    }

    andHaving(condition: string | WhereQueryBuilder) {
        this.query.having.andWhere(condition);

        return this;
    }

    orHaving(conditions: string | WhereQueryBuilder) {
        this.query.having.orWhere(conditions);

        return this;
    }

    orderBy(column: Array<string> | string) {
        if (Array.isArray(column)) {
            this.query.order.push(...column);
        } else if (isString(column)) {
            this.query.order.push(column);
        }

        return this;
    }

    groupBy(column: Array<string> | string) {
        if (Array.isArray(column)) {
            this.query.group.push(...column);
        } else if (isString(column)) {
            this.query.group.push(column);
        }

        return this;
    }

    limit(limit: number) {
        this.query.limit = Math.max(1, Math.round(limit));

        return this;
    }

    offset(offset: number) {
        this.query.offset = Math.max(0, Math.round(offset));

        return this;
    }
}
